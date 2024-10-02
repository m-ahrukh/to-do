import { supabase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
    const {data: session} = await supabase.auth.getSession()
    const {pathname} = req.nextUrl;

    if (!session && pathname !== '/signin' && pathname!== 'signup'){
        return NextResponse.redirect(new URL('/signin', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/protected-route']
}