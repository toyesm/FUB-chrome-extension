/**
 * Search History Management
 * Stores recent searches in localStorage
 */

export interface SearchHistoryItem {
  id: string;
  type: 'email' | 'phone';
  value: string;
  timestamp: number;
}

const STORAGE_KEY = 'fub_search_history';
const MAX_HISTORY_ITEMS = 10;

/**
 * Get search history from localStorage
 */
export function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const history: SearchHistoryItem[] = JSON.parse(stored);
    return history.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error reading search history:', error);
    return [];
  }
}

/**
 * Add a search to history
 */
export function addToSearchHistory(type: 'email' | 'phone', value: string): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getSearchHistory();

    // Check if this search already exists
    const existingIndex = history.findIndex(
      (item) => item.type === type && item.value.toLowerCase() === value.toLowerCase()
    );

    // Remove if exists (we'll add it as most recent)
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }

    // Add new item at the beginning
    const newItem: SearchHistoryItem = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      value,
      timestamp: Date.now(),
    };

    history.unshift(newItem);

    // Keep only the most recent items
    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
}

/**
 * Clear all search history
 */
export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
}

/**
 * Remove a specific item from history
 */
export function removeFromSearchHistory(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getSearchHistory();
    const filtered = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing from search history:', error);
  }
}
