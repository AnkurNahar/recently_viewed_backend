const { recentProducts } = require('./userDAO');
const { db } = require('../config/firebase');

// Mock Firestore's db object
jest.mock('../config/firebase');

describe("recentProducts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a formatted list of recently viewed products", async () => {
    const mockData = [
      {
        id: "OB7ulkU9ahwyRjs1O1wn",
        data: () => ({
          productId: "OB7ulkU9ahwyRjs1O1wn",
          productName: "laptop",
          viewedAt: {
            _seconds: 1730839635,
            _nanoseconds: 85000000,
          },
        }),
      },
    ];

    // Mock Firestore methods
    const mockSnapshot = { docs: mockData };
    const mockOrderBy = jest.fn().mockReturnThis();
    const mockLimit = jest.fn().mockReturnThis();
    const mockGet = jest.fn().mockResolvedValue(mockSnapshot);
    
    db.collection.mockReturnValue({
      doc: jest.fn(() => ({
        collection: jest.fn(() => ({
          orderBy: mockOrderBy,
          limit: mockLimit,
          get: mockGet,
        })),
      })),
    });

    const result = await recentProducts("123");

    expect(db.collection).toHaveBeenCalledWith("users");
    expect(mockOrderBy).toHaveBeenCalledWith("viewedAt", "desc");
    expect(mockLimit).toHaveBeenCalledWith(10);
    expect(mockGet).toHaveBeenCalled();

    expect(result).toEqual([
      {
        productId: "OB7ulkU9ahwyRjs1O1wn",
        productName: "laptop",
        viewedAt: "11/05/2024, 03:47:15 PM", // Expected formatted date
      },
    ]);
  });

  it("should throw an error if Firestore request fails", async () => {
    const errorMessage = "Firestore error";
    db.collection.mockReturnValue({
      doc: jest.fn(() => ({
        collection: jest.fn(() => ({
          orderBy: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          get: jest.fn().mockRejectedValue(new Error(errorMessage)),
        })),
      })),
    });

    await expect(recentProducts("123")).rejects.toThrow(errorMessage);
  });
});
