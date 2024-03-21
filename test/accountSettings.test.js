const accountSettingsController = require('./src/controller/account-settings');
const jwt = require('jsonwebtoken');
const AccountSetting = require('./../models/account-setting');

// Mocking jwt decode function
jest.mock('jsonwebtoken', () => ({
    decode: jest.fn(),
}));

// Mocking AccountSetting model methods
jest.mock('./../models/user', () => ({
    findOne: jest.fn(),
    deleteOne: jest.fn(),
}));

describe('getAccountSettings', () => {
    test('should return account settings', async () => {
        const mockUserId = 'mockUserId';
        const mockAccountSettings = { email: 'test@example.com', gender: 'Male', country: 'US', connectedAccounts: [] };
        jwt.decode.mockReturnValueOnce({ _id: mockUserId });
        AccountSetting.findOne.mockResolvedValueOnce(mockAccountSettings);

        const req = { body: { token: 'mockToken' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await accountSettingsController.getAccountSettings(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockAccountSettings);
    });

    test('should handle errors', async () => {
        jwt.decode.mockReturnValueOnce(undefined); // Simulating invalid token
        const req = { body: { token: 'mockToken' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await accountSettingsController.getAccountSettings(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});

describe('modifyAccountSettings', () => {
    test('should modify account settings', async () => {
        const mockUserId = 'mockUserId';
        jwt.decode.mockReturnValueOnce({ _id: mockUserId });

        const mockReqBody = { token: 'mockToken', email: 'modified@example.com' };
        const mockAccountSetting = { save: jest.fn() };
        AccountSetting.findOne.mockResolvedValueOnce(mockAccountSetting);

        const req = { body: mockReqBody };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await accountSettingsController.modifyAccountSettings(req, res);

        expect(mockAccountSetting.email).toBe(mockReqBody.email);
        expect(mockAccountSetting.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'success' });
    });

    test('should handle errors', async () => {
        jwt.decode.mockReturnValueOnce(undefined); // Simulating invalid token
        const req = { body: { token: 'mockToken' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await accountSettingsController.modifyAccountSettings(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});

describe('deleteAccount', () => {
    test('should delete account', async () => {
        const mockUserId = 'mockUserId';
        const mockReqBody = { user: mockUserId };
        AccountSetting.deleteOne.mockResolvedValueOnce({});

        const req = { body: mockReqBody };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await accountSettingsController.deleteAccount(req, res);

        expect(AccountSetting.deleteOne).toHaveBeenCalledWith({ _id: mockUserId });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Account deleted successfully' });
    });

    test('should handle errors', async () => {
        const req = { body: {} }; // Simulating missing user ID
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await accountSettingsController.deleteAccount(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID is required' });
    });
});
