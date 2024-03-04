'use_server'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import authConfig from './auth.config'
// import { GoogleProfile } from 'next-auth/providers/google'
import Google from 'next-auth/providers/google'

const prisma = new PrismaClient()

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
})
