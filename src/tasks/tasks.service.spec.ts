import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TasksStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'cianes',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

const mockTask = {
  title: 'Test title',
  description: 'Test desc',
  id: 'someId',
  status: TasksStatus.OPEN,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository; //: TasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      const data = ['someValue'];
      tasksRepository.getTasks.mockResolvedValue(data);

      const result = await tasksService.getTasks(null, mockUser);

      expect(result).toBe(data);
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(mockTask.id, mockUser);

      expect(result).toBe(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById(mockTask.id, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
