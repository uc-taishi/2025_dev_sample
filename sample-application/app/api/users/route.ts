import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ユーザー一覧の取得 (GET)
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return new NextResponse(
            'Internal Server Error: ' + (error instanceof Error ? error.message : String(error)),
            { status: 500 }
        );
    }
}

// ユーザーの作成 (POST)
export async function POST(request: Request) {
    try {
        const { name, email } = await request.json();
        const newUser = await prisma.user.create({
            data: { name, email },
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return new NextResponse(
            'Internal Server Error: ' + (error instanceof Error ? error.message : String(error)),
            { status: 500 }
        );
    }
}

// ユーザーの編集 (PUT)
export async function PUT(request: Request) {
    try {
        const { id, name, email } = await request.json();
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email },
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        return new NextResponse(
            'Internal Server Error: ' + (error instanceof Error ? error.message : String(error)),
            { status: 500 }
        );
    }
}

// ユーザーの削除 (DELETE)
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return new NextResponse(
            'Internal Server Error: ' + (error instanceof Error ? error.message : String(error)),
            { status: 500 }
        );
    }
}