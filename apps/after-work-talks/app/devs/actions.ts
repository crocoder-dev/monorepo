"use server"
 
export async function setData(data: FormData) {
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');
  const projects = data.get('projects');
  const uploadThingLink = data.get('uploadThingLink');
  const formData = {
    name,
    email,
    message: message || '',
    projects: projects || '',
    uploadThingLink: uploadThingLink || '',
  }
  console.log(formData)

  const response = await fetch(`${process.env.SITE_URL}/api/notion-upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.NOTION_DATABASE_ID!
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();

  if (responseData.success) {
    console.log('Poslano :)');
  } else {
    console.log('Nesto ne valja :(');
  }
}