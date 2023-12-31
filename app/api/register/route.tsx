import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcrypt';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the input using the updated schema
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });
  }

  // Check if the user already exists
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Extract the name from the email
  const nameFromEmail = body.email.split('@')[0];

  // Create a new user with the name extracted from email, email, and hashed password
  const newUser = await prisma.user.create({ 
    data: {
      name: nameFromEmail, // Use the extracted name
      email: body.email,
      hashedPassword, // Ensure this field matches your Prisma schema
    }
  });

  // Return the new user's email and name
  return NextResponse.json({ 
    name: newUser.name,
    email: newUser.email 
  });
}
