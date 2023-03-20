import { prisma } from "@crocoder-dev/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  await prisma.post.create({
    data: {
      publishedAt: new Date(),
      category: "category",
      title: "title",
      img: "img",
      summary: "summary",
      url: "url",
      slug: "slug",
      author: "author",
      organization: "organization",
    }
  });

  res.status(200).json({ name: 'John Doe' })
  
};

export default handler;