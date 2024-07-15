"use-server"

export async function createUser(formData: FormData) {
  const res = await fetch('https://lms-server-delta.vercel.app/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!res.ok) {
    throw new Error('Failed to create user');
  }

  console.log(res.json());

  return res.json();
}