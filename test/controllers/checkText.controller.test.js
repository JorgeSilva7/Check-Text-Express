import jestConfig from '../../jest.config';
import checkText from '../../src/controllers/checkText.controller';
import { expect, jest } from '@jest/globals';
import BusinessLogic from '../../src/business-logic/index.js';

describe('Controller: Check text unit test', () => {
  it('[ERROR] When the type doesnt exists in the body throw error', () => {
    const req = {
      body: {
        text: 'text',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    try {
      checkText(req, res);
    } catch (error) {
      expect(res.status).toBeCalledWith(400);
      const bError = new BusinessError('Validation error', 'type is required');
      expect(res.send).toBeCalledWith({ error: bError });
    }
  });

  it('[ERROR] When the text doesnt exists in the body throw error', () => {
    const req = {
      body: {
        type: 'type',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    try {
      checkText(req, res);
    } catch (error) {
      expect(res.status).toBeCalledWith(400);
      const bError = new BusinessError('Validation error', 'text is required');
      expect(res.send).toBeCalledWith({ error: bError });
    }
  });

  it('[ERROR] When the text doesnt exists in the body throw error with status code 500', () => {
    const req = {
      body: {
        type: 'type',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    try {
      checkText(req, res);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      const bError = new BusinessError('Validation error', 'text is required');
      expect(res.send).toBeCalledWith({ error: bError });
    }
  });

  it('[SUCCESS] Should return true when BusinessLogic.checkText return true', () => {
    const req = {
      body: {
        type: 'type',
        text: 'text',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    BusinessLogic.checkText = jest.fn().mockReturnValue(true);

    checkText(req, res);
    expect(res.send).toBeCalledWith(true);
    expect(res.status).toBeCalledWith(200);
  });

  it('[SUCCESS] Should return false when BusinessLogic.checkText return false', () => {
    const req = {
      body: {
        type: 'type',
        text: 'text',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    BusinessLogic.checkText = jest.fn().mockReturnValue(false);

    checkText(req, res);
    expect(res.send).toBeCalledWith(false);
    expect(res.status).toBeCalledWith(200);
  });
});
