import { useQuery, useMutation } from '@tanstack/react-query';
import { labService } from '@/services/labService';
import { sessionService } from '@/services/sessionService';

export const useLabs = () => {
  return useQuery({
    queryKey: ['labs'],
    queryFn: labService.getAllLabs,
  });
};

export const useLab = (id: number) => {
  return useQuery({
    queryKey: ['lab', id],
    queryFn: () => labService.getLabById(id),
    enabled: !!id,
  });
};

export const useStartLab = () => {
  return useMutation({
    mutationFn: labService.startLab,
  });
};

export const useValidateTask = () => {
  return useMutation({
    mutationFn: ({ sessionId, taskId }: { sessionId: string; taskId: string }) =>
      sessionService.validateTask(sessionId, taskId),
  });
};