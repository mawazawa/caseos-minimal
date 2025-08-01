/*
 * ██████╗  ██████╗ ██╗   ██╗████████╗███████╗    ██╗  ██╗ █████╗ ███╗   ██╗██████╗ ██╗     ███████╗██████╗ 
 * ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝    ██║  ██║██╔══██╗████╗  ██║██╔══██╗██║     ██╔════╝██╔══██╗
 * ██████╔╝██║   ██║██║   ██║   ██║   █████╗      ███████║███████║██╔██╗ ██║██║  ██║██║     █████╗  ██████╔╝
 * ██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝      ██╔══██║██╔══██║██║╚██╗██║██║  ██║██║     ██╔══╝  ██╔══██╗
 * ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗    ██║  ██║██║  ██║██║ ╚████║██████╔╝███████╗███████╗██║  ██║
 * ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
 * NextAuth.js v5 API Route Handler - CaseOS Legal AI Platform
 *
 * This is the NextAuth.js v5 API route handler that processes all authentication requests.
 * It imports the handlers from our main auth.ts configuration file.
 */

import { handlers } from "@/auth" // Import from our main auth.ts file

// Export the GET and POST handlers from NextAuth
export const { GET, POST } = handlers