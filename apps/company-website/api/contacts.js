/* eslint-disable import/no-unresolved */
/* eslint-disable no-throw-literal */
/* eslint-disable no-useless-catch */
import fetch from 'node-fetch';
import { nanoid } from 'nanoid';
import { Client } from '@notionhq/client';

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

const mentionPerson = ({ id, email }) => [
  {
    type: 'mention',
    mention: {
      type: 'user',
      user: {
        object: 'user',
        id,
        type: 'person',
        person: {
          email,
        },
      },
    },
    plain_text: '',
    href: null,
  },
  {
    type: 'text',
    text: {
      content: ' ',
    },
  },
];

const getMentions = () => {
  const emails = process.env.MENTION_EMAILS.split(',');
  const ids = process.env.MENTION_IDS.split(',');

  return ids.map((id, i) => ({
    id,
    email: emails[i],
  }));
};

const mentionPeople = () => getMentions().flatMap(mentionPerson);

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
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: mentionPeople(),
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

    const { email, name, message } = req.body;

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
