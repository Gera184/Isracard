using backend.Models;
using Microsoft.Extensions.Caching.Memory;

namespace backend.Services
{
    public interface IBankService
    {
        List<Bank> GetBanks();
    }

    public class BankService(IMemoryCache memoryCache) : IBankService
    {
        private readonly IMemoryCache _cache = memoryCache;
        private const string CacheKey = "BanksCacheKey";

        public List<Bank> GetBanks()
        {
            if (!_cache.TryGetValue(CacheKey, out List<Bank>? banks))
            {
                Console.WriteLine("Fetching banks from data source (not cached)...");
                banks = InitializeMockBanks();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(10));

                _cache.Set(CacheKey, banks, cacheEntryOptions);

                Console.WriteLine("Banks fetched from data source and cached.");
            }
            else
            {
                Console.WriteLine("Fetching banks from cache...");
            }

            return banks!;
        }
        private static List<Bank> InitializeMockBanks()
        {
            return
            [
                new() { Name = "AFRICAN BANKING CORPORATION", Code = 35, Description = "African Banking Corporation description" },
                new() { Name = "BANK OF AFRICA KENYA LTD", Code = 19, Description = "Bank of Africa Kenya Ltd description" },
                new() { Name = "BANK OF BARODA", Code = 6, Description = "Bank of Baroda description" },
                new() { Name = "BANK OF INDIA", Code = 5, Description = "Bank of India description" },
                new() { Name = "BARCLAYS BANK OF KENYA LIMITED", Code = 3, Description = "Barclays Bank of Kenya Limited description" },
                new() { Name = "CENTRAL BANK OF KENYA", Code = 9, Description = "Central Bank of Kenya description" },
                new() { Name = "CO OPERATIVE BANK", Code = 11, Description = "Cooperative Bank description" },
                new() { Name = "COMMERCIAL BANK OF AFRICA LTD", Code = 59, Description = "Commercial Bank of Africa Ltd description" },
                new() { Name = "CONSOLIDATED BANK OF KENYA LTD", Code = 23, Description = "Consolidated Bank of Kenya Ltd description" },
                new() { Name = "CREDIT BANK LTD", Code = 24, Description = "Credit Bank Ltd description" }
            ];
        }

    }
}