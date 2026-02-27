'use client';

import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

// در صفحه lab
const startLab = async (labId: number) => {
  const token = localStorage.getItem('accessToken');
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/labs/${labId}/start/`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // بعد، redirect به session یا refresh
};