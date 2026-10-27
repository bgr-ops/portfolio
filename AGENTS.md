# Project Instructions for AI Agent

You are building a fully dynamic personal portfolio website for Paschal Utule (Software Engineer & Digital Writer).

## Core Requirements
- Public portfolio site that is 100% content-driven from the database
- Secure Admin Dashboard where the owner can update LITERALLY EVERYTHING without editing code
- Admin must be able to manage: Hero, About, Projects, Books, Experience, Skills, Contact info, images, and any future sections
- Full CRUD + image uploads for Projects and Books
- Support both Light and Dark mode
- Clean, modern design inspired by honour.pxxl.pro (deep blacks, elegant accent color, generous whitespace)

## Tech Stack (Do not change)
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Auth + Database + Storage)
- Deployable on Vercel

## Priority Order
1. Set up Supabase project and schema
2. Build authentication (admin login only)
3. Create Admin Dashboard with full content management
4. Build the public portfolio pages that pull all data from Supabase
5. Make everything beautiful and responsive