'use client';

import { useCallback, useEffect, useState } from 'react';
import { Lab, LabSection, LabStartResponse, LabTask } from '@/types/api';
import { labService } from '@/services/labService';
import { sessionService } from '@/services/sessionService';

export const useLabs = () => {
  const [data, setData] = useState<Lab[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    labService
      .getAllLabs()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};

export const useLab = (id: number) => {
  const [data, setData] = useState<Lab>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) return;
    labService
      .getLabById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, isLoading, error };
};

export const useLabSections = () => {
  const [data, setData] = useState<LabSection[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    labService
      .getAllLabSections()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};

export const useLabTasks = () => {
  const [data, setData] = useState<LabTask[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    labService
      .getAllLabTasks()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};

export const useStartLab = () => {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = useCallback(async (labId: number): Promise<LabStartResponse> => {
    setIsPending(true);
    try {
      return await labService.startLab(labId);
    } finally {
      setIsPending(false);
    }
  }, []);

  return { mutateAsync, isPending };
};

export const useValidateTask = () => {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = useCallback(async ({ sessionId, taskId }: { sessionId: string; taskId: string | number }) => {
    setIsPending(true);
    try {
      return await sessionService.validateTask(sessionId, taskId);
    } finally {
      setIsPending(false);
    }
  }, []);

  return { mutateAsync, isPending };
};
