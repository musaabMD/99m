// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export function createClient() {
//   const cookieStore = cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) =>
//               cookieStore.set(name, value, options)
//             );
//           } catch {
//             // The `setAll` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//       },
//     }
//   );
// }
// libs/supabase/server.js
import { createServerClient } from '@supabase/ssr';

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          // Supabase automatically manages cookies in App Router
          return [];
        },
        setAll(cookiesToSet) {
          // No need to manually set cookies in App Router for Supabase
        },
      },
    }
  );
}
