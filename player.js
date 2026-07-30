/**
 * player.js - Roblox Player Statistics Module
 * Connect this to your HTML to dynamically manage player ID, username,
 * mugshot, and 4 category ratings (cc/cam/cons/bnc) with overall rating.
 */

const PlayerStats = (function() {
    // ----- PRIVATE CONFIGURATION -----
    // Default player settings - EDIT THESE VALUES AS NEEDED
    const DEFAULT_CONFIG = {
        userId: 1619886,
        username: "haloman3333",
        ratings: {
            cc: 0,      // Close Combat rating (0-10.0)
            cam: 0,     // Camera/Camerawork rating (0-10.0)
            cons: 0,    // Construction rating (0-10.0)
            bnc: 0      // Bounce/Movement rating (0-10.0)
        }
    };

    // Current player state
    let currentPlayer = {
        userId: DEFAULT_CONFIG.userId,
        username: DEFAULT_CONFIG.username,
        ratings: { ...DEFAULT_CONFIG.ratings }
    };

    // ----- DOM ELEMENT REFERENCES -----
    let elements = {};

    function cacheElements() {
        elements = {
            userIdDisplay: document.getElementById('userIdDisplay'),
            usernameDisplay: document.getElementById('usernameDisplay'),
            mugshotContainer: document.getElementById('mugshotContainer'),
            playerHeadshot: document.getElementById('playerHeadshot'),
            ccRating: document.getElementById('ccRating'),
            camRating: document.getElementById('camRating'),
            consRating: document.getElementById('consRating'),
            bncRating: document.getElementById('bncRating'),
            overallRatingValue: document.getElementById('overallRatingValue')
        };
    }

    // ----- UTILITY FUNCTIONS -----
    
    /**
     * Calculate overall rating as average of all 4 categories
     * @param {Object} ratings - Object with cc, cam, cons, bnc properties
     * @returns {number} Average rounded to 1 decimal place
     */
    function calculateOverall(ratings) {
        const sum = ratings.cc + ratings.cam + ratings.cons + ratings.bnc;
        return Math.round((sum / 4) * 10) / 10;
    }

    /**
     * Clamp a rating value between 0 and 10
     * @param {number} value - The rating value to clamp
     * @returns {number} Clamped value between 0 and 10
     */
    function clampRating(value) {
        return Math.max(0, Math.min(10, parseFloat(value) || 0));
    }

    /**
     * Format rating to always show 1 decimal place
     * @param {number} value - The rating value
     * @returns {string} Formatted rating string
     */
    function formatRating(value) {
        return parseFloat(value).toFixed(1);
    }

    // ----- MUGSHOT LOADING -----
    
    /**
     * Load Roblox player headshot/mugshot from Roblox API
     * @param {number} userId - The Roblox user ID
     */
    function loadMugshot(userId) {
        if (!elements.playerHeadshot || !elements.mugshotContainer) {
            console.warn('Mugshot elements not found in DOM');
            return;
        }

        const headshotUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=150&height=150&format=png`;
        
        // Reset image state
        elements.playerHeadshot.style.display = 'none';
        elements.playerHeadshot.src = '';
        
        // Test image loading
        const testImage = new Image();
        testImage.crossOrigin = 'anonymous';
        
        testImage.onload = function() {
            elements.playerHeadshot.src = headshotUrl;
            elements.playerHeadshot.style.display = 'block';
            console.log(`✓ Mugshot loaded for user ID: ${userId}`);
        };
        
        testImage.onerror = function() {
            elements.playerHeadshot.style.display = 'none';
            console.warn(`✗ Failed to load mugshot for user ID: ${userId}. Using fallback.`);
        };
        
        testImage.src = headshotUrl;
        
        // Timeout fallback (4 seconds)
        setTimeout(() => {
            if (!testImage.complete || testImage.naturalWidth === 0) {
                elements.playerHeadshot.style.display = 'none';
            }
        }, 4000);
    }

    // ----- UI UPDATE FUNCTIONS -----
    
    /**
     * Update all display elements with current player data
     */
    function refreshDisplay() {
        if (!elements.userIdDisplay) {
            cacheElements();
        }
        
        // Update user ID and username
        if (elements.userIdDisplay) {
            elements.userIdDisplay.textContent = `ID: ${currentPlayer.userId}`;
        }
        if (elements.usernameDisplay) {
            elements.usernameDisplay.textContent = currentPlayer.username;
        }
        
        // Update category ratings
        if (elements.ccRating) {
            elements.ccRating.textContent = formatRating(currentPlayer.ratings.cc);
        }
        if (elements.camRating) {
            elements.camRating.textContent = formatRating(currentPlayer.ratings.cam);
        }
        if (elements.consRating) {
            elements.consRating.textContent = formatRating(currentPlayer.ratings.cons);
        }
        if (elements.bncRating) {
            elements.bncRating.textContent = formatRating(currentPlayer.ratings.bnc);
        }
        
        // Update overall rating
        const overall = calculateOverall(currentPlayer.ratings);
        if (elements.overallRatingValue) {
            elements.overallRatingValue.textContent = formatRating(overall);
        }
        
        console.log('📊 Display updated:', {
            player: currentPlayer.username,
            ratings: currentPlayer.ratings,
            overall: overall
        });
    }

    // ----- PUBLIC API -----
    
    return {
        /**
         * Initialize the player stats module
         * @param {Object} config - Optional configuration object
         * @param {number} [config.userId] - Roblox user ID
         * @param {string} [config.username] - Roblox username
         * @param {Object} [config.ratings] - Rating object {cc, cam, cons, bnc}
         */
        init: function(config = {}) {
            // Cache DOM elements first
            cacheElements();
            
            // Apply custom config if provided
            if (config.userId !== undefined) {
                currentPlayer.userId = config.userId;
            }
            if (config.username !== undefined) {
                currentPlayer.username = config.username;
            }
            if (config.ratings) {
                currentPlayer.ratings = {
                    cc: clampRating(config.ratings.cc ?? currentPlayer.ratings.cc),
                    cam: clampRating(config.ratings.cam ?? currentPlayer.ratings.cam),
                    cons: clampRating(config.ratings.cons ?? currentPlayer.ratings.cons),
                    bnc: clampRating(config.ratings.bnc ?? currentPlayer.ratings.bnc)
                };
            }
            
            // Update display and load mugshot
            refreshDisplay();
            loadMugshot(currentPlayer.userId);
            
            console.log('🚀 PlayerStats initialized:', currentPlayer);
        },
        
        /**
         * Set a new player by user ID (automatically fetches username)
         * @param {number} userId - Roblox user ID
         * @param {string} [username] - Optional username (will display as provided)
         */
        setPlayer: function(userId, username = null) {
            currentPlayer.userId = userId;
            if (username) {
                currentPlayer.username = username;
            } else {
                // Attempt to fetch username from Roblox API
                this.fetchUsername(userId).then(fetchedName => {
                    currentPlayer.username = fetchedName;
                    refreshDisplay();
                }).catch(() => {
                    currentPlayer.username = `User_${userId}`;
                    refreshDisplay();
                });
            }
            
            refreshDisplay();
            loadMugshot(userId);
        },
        
        /**
         * Set player username directly
         * @param {string} username - The new username
         */
        setUsername: function(username) {
            currentPlayer.username = username;
            refreshDisplay();
        },
        
        /**
         * Set a single category rating
         * @param {string} category - Category name: 'cc', 'cam', 'cons', or 'bnc'
         * @param {number} value - Rating value (0-10.0)
         */
        setRating: function(category, value) {
            const validCategories = ['cc', 'cam', 'cons', 'bnc'];
            if (!validCategories.includes(category)) {
                console.error(`Invalid category: ${category}. Use: cc, cam, cons, or bnc`);
                return;
            }
            
            currentPlayer.ratings[category] = clampRating(value);
            refreshDisplay();
        },
        
        /**
         * Set all ratings at once
         * @param {Object} ratings - Object with cc, cam, cons, bnc properties
         */
        setAllRatings: function(ratings) {
            currentPlayer.ratings = {
                cc: clampRating(ratings.cc ?? currentPlayer.ratings.cc),
                cam: clampRating(ratings.cam ?? currentPlayer.ratings.cam),
                cons: clampRating(ratings.cons ?? currentPlayer.ratings.cons),
                bnc: clampRating(ratings.bnc ?? currentPlayer.ratings.bnc)
            };
            refreshDisplay();
        },
        
        /**
         * Get current player data
         * @returns {Object} Current player state
         */
        getPlayerData: function() {
            return {
                userId: currentPlayer.userId,
                username: currentPlayer.username,
                ratings: { ...currentPlayer.ratings },
                overall: calculateOverall(currentPlayer.ratings)
            };
        },
        
        /**
         * Get current overall rating
         * @returns {number} Overall rating
         */
        getOverallRating: function() {
            return calculateOverall(currentPlayer.ratings);
        },
        
        /**
         * Fetch Roblox username from user ID using Roblox API
         * @param {number} userId - The Roblox user ID
         * @returns {Promise<string>} The username
         */
        fetchUsername: async function(userId) {
            try {
                const response = await fetch(`https://users.roblox.com/v1/users/${userId}`);
                if (!response.ok) throw new Error('API request failed');
                const data = await response.json();
                return data.name || `User_${userId}`;
            } catch (error) {
                console.warn('Could not fetch username:', error);
                return `User_${userId}`;
            }
        },
        
        /**
         * Reset to default configuration
         */
        reset: function() {
            currentPlayer = {
                userId: DEFAULT_CONFIG.userId,
                username: DEFAULT_CONFIG.username,
                ratings: { ...DEFAULT_CONFIG.ratings }
            };
            refreshDisplay();
            loadMugshot(currentPlayer.userId);
            console.log('🔄 Reset to default player');
        }
    };
})();

// ----- AUTO-INITIALIZATION WHEN DOM IS READY -----
// This automatically connects player.js to your HTML
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with default player (builderman, all zeros)
    PlayerStats.init();
    
    // Example: You can customize the player here!
    // Uncomment and modify the lines below to set your own player:
    
    /*
    PlayerStats.init({
        userId: 1,              // Roblox user ID
        username: "Roblox",     // Username
        ratings: {
            cc: 7.5,
            cam: 8.0,
            cons: 6.5,
            bnc: 9.0
        }
    });
    */
    
    // Or use the setter methods:
    // PlayerStats.setPlayer(123456789, "CoolPlayer123");
    // PlayerStats.setRating('cc', 9.5);
    // PlayerStats.setAllRatings({ cc: 5.5, cam: 7.0, cons: 4.5, bnc: 8.0 });
    
    console.log('✅ Player.js connected to HTML successfully!');
    console.log('💡 Use PlayerStats methods to update player data dynamically.');
    console.log('   Example: PlayerStats.setRating("cc", 7.5)');
});
