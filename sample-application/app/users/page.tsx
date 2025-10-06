'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/button';

// ユーザーデータ型定義
type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // ユーザー一覧の取得
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      const allUsers: User[] = await res.json();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 新規ユーザー作成または既存ユーザー編集
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // ユーザー編集
        await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingUser.id, name, email }),
        });
        setEditingUser(null);
      } else {
        // 新規ユーザー作成
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        });
      }
      setName('');
      setEmail('');
      fetchUsers();
    } catch (error) {
      console.error('Error creating/updating user:', error);
    }
  };

  // ユーザー削除
  const handleDelete = async (userId: number) => {
    try {
      await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId }),
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // 編集ボタンクリック時の処理
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>ユーザー管理</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>{editingUser ? 'ユーザー編集' : '新規ユーザー作成'}</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ marginRight: '10px' }}>名前:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ marginRight: '10px' }}>メールアドレス:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <Button type="submit" variant="primary">
          {editingUser ? '更新' : '作成'}
        </Button>
        {editingUser && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setEditingUser(null);
              setName('');
              setEmail('');
            }}
            style={{ marginLeft: '10px' }}
          >
            キャンセル
          </Button>
        )}
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>名前</th>
            <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>メールアドレス</th>
            <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <Button onClick={() => handleEdit(user)} style={{ marginRight: '10px' }} size="sm">
                  編集
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                  削除
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 