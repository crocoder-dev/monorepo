/* eslint-disable import/no-unresolved */
/* eslint-disable no-throw-literal */
/* eslint-disable no-useless-catch */
import fetch from 'node-fetch';
import { nanoid } from 'nanoid';
import { Client } from '@notionhq/client';
import { Ratelimit } from '@upstash/ratelimit';
// This path has to be specified because fetch is not natively supported
// in node v17 and earlier
import { Redis } from '@upstash/redis/with-fetch';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const createPayload = (name, email, url) => ({
  channel: process.env.SLACK_CHANNEL,
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'We have 1 new message(s).',
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `We got a new message from _${name}_ (_${email}_).`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ' ',
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Show me the message',
          emoji: true,
        },
        value: 'new_message_click',
        url,
        action_id: 'button-action',
      },
    },
  ],
});

const notifyContactCreated = async (name, email, url) => {
  const payload = createPayload(name, email, url);

  if (process.env.IS_OFFLINE) {
    console.log(payload);
  } else {
    try {
      const result = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': payload.length,
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          Accept: 'application/json',
        },
      });
      if (result.status !== 200) {
        throw {
          statusCode: result.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        };
      }
    } catch (error) {
      throw error;
    }
  }
};

const createContactObject = (id, email, name, content) => ({
  parent: {
    database_id: process.env.NOTION_DATABASE_ID,
  },
  properties: {
    id: {
      title: [
        {
          text: {
            content: id,
          },
        },
      ],
    },
    email: {
      email,
    },
    name: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: name,
          },
        },
      ],
    },
    date: {
      date: {
        start: new Date(),
      },
    },
  },
  children: [
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content,
            },
          },
        ],
      },
    },
  ],
});

const createContact = async (id, email, name, content) => {
  try {
    const response = await notion.pages.create(createContactObject(id, email, name, content));
    return response.url;
  } catch (error) {
    throw error;
  }
};

const processContact = async (event) => {
  try {
    const {
      id, email, name, message,
    } = event;

    if (!id || !email || !name || !message) {
      throw new Error('Missing id, email, name or message');
    }

    const url = await createContact(`Message from ${name} (${id})`, email, name, message);
    await notifyContactCreated(name, email, url);
  } catch (error) {
    throw error;
  }
};

const allowRequest = async (request) => {
  try {
    const ip = request.ip ?? '127.0.0.1';

    const ratelimit = new Ratelimit({
      limiter: Ratelimit.fixedWindow(1, '30 s'),
      /** Use fromEnv() to automatically load connection secrets from your environment
        * variables. For instance when using the Vercel integration.
        *
        * This tries to load `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from
        * your environment using `process.env`.
        */
      redis: Redis.fromEnv(),
    });

    const response = await ratelimit.limit(ip);
    return response;
  } catch (error) {
    throw {
      body: {
        message: error,
      },
    };
  }
};

const contacts = async (req, res) => {
  try {
    if (!req.body) {
      throw {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {
          message: 'No body was found',
        },
      };
    }

    const {
      email, name, message,
    } = req.body;

    const {
      success, limit, reset, remaining,
    } = await allowRequest(req);

    if (!success) {
      throw {
        statusCode: 429,
        body: {
          message: 'Too many requests. Please try again in a minute',
        },
      };
    }

    try {
      await processContact({
        id: nanoid(),
        email,
        name,
        message,
      });
    } catch (error) {
      throw error;
    }

    res.status(200).json({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 501)
      .json({ headers: error?.headers, body: error?.body?.message });
  }
};

export default contacts;
