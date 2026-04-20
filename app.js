// State - Updated with verified prices (April 15, 2026)
let state = {
    stockPrice: 23.70,  // Verified via web search: $23.40-$24.07 range
    warrantPrice: 3.40, // Verified via web search: $3.30-$3.49 range
    callPrice: 1.03,    // Oct 2026 $32 call - verify manually
    budget: 500,
    targetPrice: 50,
    strategy: 'sell',
    riskProfile: 'moderate'
};

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '🌙';
}

// Make theme toggle draggable
let isDragging = false;
let dragStartX, dragStartY;
let buttonStartX, buttonStartY;

themeToggle.addEventListener('mousedown', (e) => {
    isDragging = true;
    themeToggle.classList.add('dragging');
    
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    
    const rect = themeToggle.getBoundingClientRect();
    buttonStartX = rect.left;
    buttonStartY = rect.top;
    
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    
    const newX = buttonStartX + deltaX;
    const newY = buttonStartY + deltaY;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 54;
    const maxY = window.innerHeight - 54;
    
    const boundedX = Math.max(0, Math.min(newX, maxX));
    const boundedY = Math.max(0, Math.min(newY, maxY));
    
    themeToggle.style.left = `${boundedX}px`;
    themeToggle.style.top = `${boundedY}px`;
    themeToggle.style.right = 'auto';
    themeToggle.style.bottom = 'auto';
});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    
    isDragging = false;
    themeToggle.classList.remove('dragging');
    
    // If barely moved (< 5px), treat as click
    const deltaX = Math.abs(e.clientX - dragStartX);
    const deltaY = Math.abs(e.clientY - dragStartY);
    
    if (deltaX < 5 && deltaY < 5) {
        // Toggle theme
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    }
});

// Countdown targets with auto-reset
const countdowns = [
    { id: '420', date: new Date('2026-04-20T00:00:00'), type: '420', resetTo: '2027-04-20T00:00:00' },
    { id: '609', date: new Date('2026-06-09T00:00:00'), type: '69', resetTo: '2027-06-09T00:00:00' },
    { id: 'option', date: new Date('2026-10-16T16:00:00'), type: 'expiry', resetTo: null },
    { id: 'warrant', date: new Date('2026-10-31T23:59:59'), type: 'expiry', resetTo: null }
];

// Track celebrations to avoid spam
let celebrationActive = {
    '420': true,
    '609': false,
    'option': false,
    'warrant': false
};

let lastCelebrationCheck = Date.now();

// Easter egg - kitty descends from top
let easterEggClicks = 0;
let easterEggTimer = null;

document.addEventListener('click', function(e) {
    if (e.target.closest('.easter-egg') || e.target.closest('.theme-toggle')) {
        return;
    }
    
    easterEggClicks++;
    
    if (easterEggClicks === 7) {
        showEasterEgg();
        easterEggClicks = 0;
    }
    
    clearTimeout(easterEggTimer);
    easterEggTimer = setTimeout(() => {
        easterEggClicks = 0;
    }, 2000);
});

function showEasterEgg() {
    const egg = document.getElementById('easterEgg');
    const message = document.getElementById('easterMessage');
    
    egg.classList.add('show');
    
    setTimeout(() => {
        message.classList.add('show');
    }, 800);
    
    setTimeout(() => {
        message.classList.remove('show');
    }, 4000);
    
    setTimeout(() => {
        egg.classList.remove('show');
    }, 5500);
}

document.getElementById('easterEgg').addEventListener('click', function(e) {
    e.stopPropagation();
    const message = document.getElementById('easterMessage');
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 2500);
});

// Celebration Functions
function celebrate420() {
    // Flash green on the 420 clock
    const clock420 = document.querySelector('.countdown-grid .countdown-clock:first-child');
    if (clock420) {
        clock420.classList.add('celebrating', 'celebrating-420');
    }
    
    // Spawn fire/lighter emojis randomly
    const emojis = ['🔥', '🔥', '🔥', '💨', '🌿'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const element = document.createElement('div');
    element.className = 'celebration-emoji';
    element.textContent = emoji;
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(element);
    
    setTimeout(() => element.remove(), 3000);
}

function celebrate69() {
    // Flash purple on the 69 clock
    const clock69 = document.querySelectorAll('.countdown-grid .countdown-clock')[1];
    if (clock69) {
        clock69.classList.add('celebrating', 'celebrating-69');
    }
    
    // Purple confetti
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'celebration-confetti';
            confetti.style.background = '#9d4edd';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '0px';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 100);
    }
}

function celebrateExpiry(type) {
    // Gold flash for expiry dates
    const clocks = document.querySelectorAll('.countdown-grid .countdown-clock');
    const clock = type === 'option' ? clocks[2] : clocks[3];
    
    if (clock) {
        clock.classList.add('celebrating', 'celebrating-expiry');
    }
    
    // Gold confetti burst
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'celebration-confetti';
            confetti.style.background = '#ffd700';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '0px';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 80);
    }
}

function checkCelebrations(now) {
    // Only check celebrations every 5 seconds to avoid spam
    if (now - lastCelebrationCheck < 5000) return;
    lastCelebrationCheck = now;
    
    countdowns.forEach(countdown => {
        const targetDate = new Date(countdown.date);
        const isToday = now.toDateString() === targetDate.toDateString();
        
        if (isToday && !celebrationActive[countdown.id]) {
            celebrationActive[countdown.id] = true;
            
            // Trigger appropriate celebration
            if (countdown.type === '420') {
                // Spawn fire emojis every 2 seconds during 4/20
                setInterval(() => {
                    const stillToday = new Date().toDateString() === targetDate.toDateString();
                    if (stillToday) celebrate420();
                }, 2000);
            } else if (countdown.type === '69') {
                celebrate69();
                // Repeat every 10 seconds during the day
                setInterval(() => {
                    const stillToday = new Date().toDateString() === targetDate.toDateString();
                    if (stillToday) celebrate69();
                }, 10000);
            } else if (countdown.type === 'expiry') {
                celebrateExpiry(countdown.id);
            }
        }
        
        // Reset celebration flag when day passes
        if (!isToday && celebrationActive[countdown.id]) {
            celebrationActive[countdown.id] = false;
            
            // Remove celebration classes
            document.querySelectorAll('.countdown-clock').forEach(clock => {
                clock.classList.remove('celebrating', 'celebrating-420', 'celebrating-69', 'celebrating-expiry');
            });
        }
    });
}


// Update countdown clocks
function updateCountdowns() {
    const now = new Date();
    
    // Check for celebrations
    checkCelebrations(now);
    
    countdowns.forEach(countdown => {
        let targetDate = new Date(countdown.date);
        
        // Auto-reset logic - if date has passed and reset is available
        if (now > targetDate && countdown.resetTo) {
            countdown.date = new Date(countdown.resetTo);
            targetDate = new Date(countdown.date);
            
            // Update the next year's reset target
            const nextYear = new Date(countdown.resetTo);
            nextYear.setFullYear(nextYear.getFullYear() + 1);
            countdown.resetTo = nextYear.toISOString();
        }
        
        const diff = targetDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById(`days-${countdown.id}`).textContent = String(days).padStart(3, '0');
            document.getElementById(`hours-${countdown.id}`).textContent = String(hours).padStart(2, '0');
            document.getElementById(`mins-${countdown.id}`).textContent = String(mins).padStart(2, '0');
            document.getElementById(`secs-${countdown.id}`).textContent = String(secs).padStart(2, '0');
        } else {
            document.getElementById(`days-${countdown.id}`).textContent = '000';
            document.getElementById(`hours-${countdown.id}`).textContent = '00';
            document.getElementById(`mins-${countdown.id}`).textContent = '00';
            document.getElementById(`secs-${countdown.id}`).textContent = '00';
        }
    });
    
    const optionExp = new Date('2026-10-16T16:00:00');
    const warrantExp = new Date('2026-10-31T23:59:59');
    
    const optionDaysLeft = Math.floor((optionExp - now) / (1000 * 60 * 60 * 24));
    const warrantDaysLeft = Math.floor((warrantExp - now) / (1000 * 60 * 60 * 24));
    
    document.getElementById('callDaysLeft').textContent = optionDaysLeft > 0 ? `${optionDaysLeft} days` : 'Expired';
    document.getElementById('warrantDaysLeft').textContent = warrantDaysLeft > 0 ? `${warrantDaysLeft} days` : 'Expired';
}

// Fetch live prices
async function fetchLivePrices() {
    const loadingEl = document.getElementById('loadingStatus');
    const refreshBtn = document.getElementById('refreshBtn');
    
    if (loadingEl) {
        loadingEl.style.display = 'block';
        loadingEl.textContent = 'Loading live market data...';
        loadingEl.className = 'loading-status';
    }
    
    if (refreshBtn) {
        refreshBtn.disabled = true;
    }
    
    try {
        // IMPORTANT: Replace 'YOUR-PROJECT-NAME' with your actual Vercel project name
        // After deploying to Vercel, your URL will be: https://YOUR-PROJECT-NAME.vercel.app
        const response = await fetch('https://YOUR-PROJECT-NAME.vercel.app/api/prices');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.prices) {
            state.stockPrice = data.prices.stock;
            state.warrantPrice = data.prices.warrant;
            state.callPrice = data.prices.call;
            
            document.getElementById('stockPrice').value = data.prices.stock.toFixed(2);
            document.getElementById('warrantPrice').value = data.prices.warrant.toFixed(2);
            document.getElementById('callPrice').value = data.prices.call.toFixed(2);
            
            const timestamp = new Date(data.timestamp).toLocaleString();
            document.getElementById('lastUpdate').textContent = timestamp;
            
            if (loadingEl) {
                const message = data.fallback 
                    ? '⚠ Using cached prices (API temporarily unavailable)' 
                    : '✓ Prices updated successfully';
                loadingEl.textContent = message;
                loadingEl.classList.add(data.fallback ? 'error' : 'success');
            }
            
            update();
            updateBestValueNow();
            
            setTimeout(() => {
                if (loadingEl) loadingEl.style.display = 'none';
            }, 3000);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error fetching live prices:', error);
        
        if (loadingEl) {
            loadingEl.textContent = '⚠ Could not fetch live prices. Using default values. Click Refresh to try again.';
            loadingEl.classList.add('error');
        }
        
        document.getElementById('lastUpdate').textContent = 'Using default prices';
        update();
        updateBestValueNow();
        
        setTimeout(() => {
            if (loadingEl) loadingEl.style.display = 'none';
        }, 5000);
    } finally {
        if (refreshBtn) {
            refreshBtn.disabled = false;
        }
    }
}

// Best Value Now - Roaring Kitty Methodology
function updateBestValueNow() {
    const now = new Date();
    const optionExp = new Date('2026-10-16T16:00:00');
    const warrantExp = new Date('2026-10-31T23:59:59');
    
    const optionDaysLeft = Math.floor((optionExp - now) / (1000 * 60 * 60 * 24));
    const warrantDaysLeft = Math.floor((warrantExp - now) / (1000 * 60 * 60 * 24));
    
    // Roaring Kitty factors: Deep Value + Asymmetric Upside
    // 1. Price/Strike ratio (intrinsic value potential)
    // 2. Time value remaining
    // 3. Leverage efficiency (bang for buck)
    // 4. Downside protection
    
    const stockScore = {
        name: 'GME Common Stock',
        intrinsic: 10, // No strike = always has value
        timeValue: 10, // No expiration
        leverage: state.stockPrice > 0 ? (1 / state.stockPrice) * 100 : 0, // Share efficiency
        downside: 10, // No expiration risk
        total: 0
    };
    
    const warrantScore = {
        name: 'GME+ Warrants',
        intrinsic: state.stockPrice > 32 ? ((state.stockPrice - 32) / state.warrantPrice) * 10 : (state.stockPrice / 32) * 5,
        timeValue: warrantDaysLeft > 0 ? Math.min(10, (warrantDaysLeft / 180) * 10) : 0,
        leverage: state.warrantPrice > 0 ? (state.stockPrice / state.warrantPrice) : 0,
        downside: warrantDaysLeft > 90 ? 8 : (warrantDaysLeft > 30 ? 5 : 2),
        total: 0
    };
    
    const callScore = {
        name: '$32 Call Options',
        intrinsic: state.stockPrice > 32 ? ((state.stockPrice - 32) / state.callPrice) * 10 : (state.stockPrice / 32) * 4,
        timeValue: optionDaysLeft > 0 ? Math.min(10, (optionDaysLeft / 180) * 10) : 0,
        leverage: state.callPrice > 0 ? (state.stockPrice / state.callPrice) : 0,
        downside: optionDaysLeft > 90 ? 7 : (optionDaysLeft > 30 ? 4 : 1),
        total: 0
    };
    
    // Weight the scores (Roaring Kitty style: value + asymmetry)
    stockScore.total = (stockScore.intrinsic * 0.3) + (stockScore.timeValue * 0.2) + (stockScore.leverage * 0.2) + (stockScore.downside * 0.3);
    warrantScore.total = (warrantScore.intrinsic * 0.25) + (warrantScore.timeValue * 0.25) + (warrantScore.leverage * 0.35) + (warrantScore.downside * 0.15);
    callScore.total = (callScore.intrinsic * 0.25) + (callScore.timeValue * 0.25) + (callScore.leverage * 0.4) + (callScore.downside * 0.1);
    
    const scores = [stockScore, warrantScore, callScore].sort((a, b) => b.total - a.total);
    const winner = scores[0];
    
    let reason = '';
    if (winner.name === 'GME Common Stock') {
        reason = `Stock offers the best risk-adjusted value right now. No expiration risk, direct ownership, and solid floor at $${state.stockPrice.toFixed(2)}. Patient capital wins.`;
    } else if (winner.name === 'GME+ Warrants') {
        reason = `Warrants provide ${(state.stockPrice / state.warrantPrice).toFixed(1)}x leverage with ${warrantDaysLeft} days remaining. Asymmetric upside above $32 strike with manageable time decay.`;
    } else {
        reason = `Call options deliver maximum leverage (${(state.stockPrice / state.callPrice).toFixed(1)}x) with ${optionDaysLeft} days until expiration. Highest risk, highest reward potential.`;
    }
    
    document.getElementById('bestValuePick').textContent = winner.name;
    document.getElementById('bestValueReason').textContent = reason;
}

// DOM elements
const stockPriceInput = document.getElementById('stockPrice');
const warrantPriceInput = document.getElementById('warrantPrice');
const callPriceInput = document.getElementById('callPrice');
const budgetInput = document.getElementById('budget');
const targetPriceInput = document.getElementById('targetPrice');
const sellBtn = document.getElementById('sellBtn');
const exerciseBtn = document.getElementById('exerciseBtn');
const refreshBtn = document.getElementById('refreshBtn');
const riskProfiles = document.querySelectorAll('.risk-profile');

stockPriceInput.addEventListener('input', (e) => {
    state.stockPrice = parseFloat(e.target.value) || 0;
    update();
    updateBestValueNow();
});

warrantPriceInput.addEventListener('input', (e) => {
    state.warrantPrice = parseFloat(e.target.value) || 0;
    update();
    updateBestValueNow();
});

callPriceInput.addEventListener('input', (e) => {
    state.callPrice = parseFloat(e.target.value) || 0;
    update();
    updateBestValueNow();
});

budgetInput.addEventListener('input', (e) => {
    state.budget = Math.max(0, parseFloat(e.target.value) || 0);
    update();
});

targetPriceInput.addEventListener('input', (e) => {
    state.targetPrice = Math.max(33, parseFloat(e.target.value) || 50);
    update();
});

sellBtn.addEventListener('click', () => {
    state.strategy = 'sell';
    sellBtn.classList.add('active');
    exerciseBtn.classList.remove('active');
    update();
});

exerciseBtn.addEventListener('click', () => {
    state.strategy = 'exercise';
    exerciseBtn.classList.add('active');
    sellBtn.classList.remove('active');
    update();
});

refreshBtn.addEventListener('click', () => {
    fetchLivePrices();
});

riskProfiles.forEach(profile => {
    profile.addEventListener('click', () => {
        riskProfiles.forEach(p => p.classList.remove('active'));
        profile.classList.add('active');
        state.riskProfile = profile.dataset.profile;
        update();
    });
});

function calculatePositions() {
    const stockShares = Math.floor(state.budget / state.stockPrice);
    const warrants = Math.floor(state.budget / state.warrantPrice);
    const callContracts = Math.floor(state.budget / (state.callPrice * 100));
    
    return {
        stock: {
            quantity: stockShares,
            totalCost: stockShares * state.stockPrice
        },
        warrant: {
            quantity: warrants,
            totalCost: warrants * state.warrantPrice,
            totalExerciseCost: warrants * 32
        },
        call: {
            quantity: callContracts,
            totalPremiumCost: callContracts * state.callPrice * 100,
            totalExerciseCost: callContracts * 3200
        }
    };
}

function calculateValueAtPrice(gmePrice) {
    const pos = calculatePositions();
    
    const stockValue = pos.stock.quantity * gmePrice;
    const stockProfit = stockValue - pos.stock.totalCost;
    const stockROI = pos.stock.totalCost > 0 ? (stockProfit / pos.stock.totalCost) * 100 : 0;
    
    let warrantSellValue = 0, warrantSellProfit = 0, warrantSellROI = 0;
    let warrantExerciseValue = 0, warrantExerciseProfit = 0, warrantExerciseROI = 0;
    
    if (gmePrice > 32) {
        const intrinsic = gmePrice - 32;
        const warrantMarket = intrinsic * 1.5;
        warrantSellValue = pos.warrant.quantity * warrantMarket;
        warrantSellProfit = warrantSellValue - pos.warrant.totalCost;
        warrantSellROI = pos.warrant.totalCost > 0 ? (warrantSellProfit / pos.warrant.totalCost) * 100 : 0;
        
        const totalInv = pos.warrant.totalCost + pos.warrant.totalExerciseCost;
        warrantExerciseValue = pos.warrant.quantity * gmePrice;
        warrantExerciseProfit = warrantExerciseValue - totalInv;
        warrantExerciseROI = totalInv > 0 ? (warrantExerciseProfit / totalInv) * 100 : 0;
    }
    
    let callSellValue = 0, callSellProfit = 0, callSellROI = 0;
    let callExerciseValue = 0, callExerciseProfit = 0, callExerciseROI = 0;
    
    if (gmePrice > 32 && pos.call.quantity > 0) {
        const intrinsic = gmePrice - 32;
        const optionMarket = intrinsic * 1.3;
        callSellValue = pos.call.quantity * optionMarket * 100;
        callSellProfit = callSellValue - pos.call.totalPremiumCost;
        callSellROI = pos.call.totalPremiumCost > 0 ? (callSellProfit / pos.call.totalPremiumCost) * 100 : 0;
        
        const totalInv = pos.call.totalPremiumCost + pos.call.totalExerciseCost;
        callExerciseValue = pos.call.quantity * gmePrice * 100;
        callExerciseProfit = callExerciseValue - totalInv;
        callExerciseROI = totalInv > 0 ? (callExerciseProfit / totalInv) * 100 : 0;
    }
    
    return {
        stock: { value: stockValue, profit: stockProfit, roi: stockROI },
        warrant: {
            sell: { value: warrantSellValue, profit: warrantSellProfit, roi: warrantSellROI },
            exercise: { value: warrantExerciseValue, profit: warrantExerciseProfit, roi: warrantExerciseROI }
        },
        call: {
            sell: { value: callSellValue, profit: callSellProfit, roi: callSellROI },
            exercise: { value: callExerciseValue, profit: callExerciseProfit, roi: callExerciseROI }
        }
    };
}

function getRecommendation() {
    const pos = calculatePositions();
    const val = calculateValueAtPrice(state.targetPrice);
    
    const now = new Date();
    const optionExp = new Date('2026-10-16T16:00:00');
    const warrantExp = new Date('2026-10-31T23:59:59');
    
    const optionDaysLeft = Math.floor((optionExp - now) / (1000 * 60 * 60 * 24));
    const warrantDaysLeft = Math.floor((warrantExp - now) / (1000 * 60 * 60 * 24));
    
    const optionTimeValue = optionDaysLeft > 0 ? Math.min(1, optionDaysLeft / 180) : 0;
    const warrantTimeValue = warrantDaysLeft > 0 ? Math.min(1, warrantDaysLeft / 180) : 0;
    
    const stockROI = val.stock.roi;
    let warrantROI = (state.strategy === 'sell' ? val.warrant.sell.roi : val.warrant.exercise.roi) * warrantTimeValue;
    let callROI = (state.strategy === 'sell' ? val.call.sell.roi : val.call.exercise.roi) * optionTimeValue;
    
    let warrantWarning = '';
    let callWarning = '';
    
    if (warrantDaysLeft < 90) {
        warrantWarning = ` ⚠️ Warning: Only ${warrantDaysLeft} days until warrant expiration.`;
        warrantROI *= 0.7;
    }
    
    if (optionDaysLeft < 90) {
        callWarning = ` ⚠️ Warning: Only ${optionDaysLeft} days until option expiration.`;
        callROI *= 0.7;
    }
    
    if (state.riskProfile === 'conservative') {
        return {
            winner: 'GME Common Stock',
            explanation: `Conservative investors prioritize capital preservation. Direct stock purchase provides no expiration risk and full upside participation. With $${state.budget}, you can purchase ${pos.stock.quantity} shares at $${state.stockPrice.toFixed(2)} each.`,
            type: 'stock',
            pos: pos,
            val: val
        };
    } else if (state.riskProfile === 'moderate') {
        if (warrantROI > callROI && warrantROI > stockROI && pos.warrant.quantity > 0 && warrantDaysLeft > 0) {
            return {
                winner: 'GME+ Warrants',
                explanation: state.strategy === 'sell' 
                    ? `Warrants offer superior leverage with manageable risk. Purchase ${pos.warrant.quantity} warrants at $${state.warrantPrice.toFixed(2)} each. Sell when GME crosses $32 — no exercise capital needed.${warrantWarning}`
                    : `Warrants provide leveraged ownership path. Purchase ${pos.warrant.quantity} warrants at $${state.warrantPrice.toFixed(2)} each, exercise at $32 per warrant. Total investment: $${(pos.warrant.totalCost + pos.warrant.totalExerciseCost).toFixed(2)}.${warrantWarning}`,
                type: 'warrant',
                pos: pos,
                val: val
            };
        } else if (callROI > stockROI && pos.call.quantity > 0 && optionDaysLeft > 0) {
            return {
                winner: '$32 Call Options (Oct 16, 2026)',
                explanation: state.strategy === 'sell'
                    ? `Maximum leverage play. Purchase ${pos.call.quantity} contract${pos.call.quantity !== 1 ? 's' : ''} at $${(state.callPrice * 100).toFixed(0)} each. Sell for profit when GME moves.${callWarning}`
                    : `Leveraged ownership via options. ${pos.call.quantity} contract${pos.call.quantity !== 1 ? 's' : ''} controls ${pos.call.quantity * 100} shares. Total: $${(pos.call.totalPremiumCost + pos.call.totalExerciseCost).toFixed(2)}.${callWarning}`,
                type: 'call',
                pos: pos,
                val: val
            };
        } else {
            return {
                winner: 'GME Common Stock',
                explanation: `At current pricing${optionDaysLeft < 120 || warrantDaysLeft < 120 ? ' and time remaining' : ''}, direct stock ownership offers best risk-adjusted returns. ${pos.stock.quantity} shares with no expiration concerns.`,
                type: 'stock',
                pos: pos,
                val: val
            };
        }
    } else {
        if (pos.call.quantity > 0 && callROI > warrantROI && optionDaysLeft > 30) {
            return {
                winner: '$32 Call Options (Oct 16, 2026)',
                explanation: state.strategy === 'sell'
                    ? `Maximum asymmetric upside. ${pos.call.quantity} contract${pos.call.quantity !== 1 ? 's' : ''} for $${pos.call.totalPremiumCost.toFixed(2)}. Explosive gains if GME squeezes.${callWarning}`
                    : `Aggressive leverage with conversion option. ${pos.call.quantity} contract${pos.call.quantity !== 1 ? 's' : ''} controls ${pos.call.quantity * 100} shares.${callWarning}`,
                type: 'call',
                pos: pos,
                val: val
            };
        } else if (pos.warrant.quantity > 0 && warrantDaysLeft > 30) {
            return {
                winner: 'GME+ Warrants',
                explanation: state.strategy === 'sell'
                    ? `Maximum warrant leverage. ${pos.warrant.quantity} warrants for $${pos.warrant.totalCost.toFixed(2)}. Pure upside above $32 until Oct 31, 2026.${warrantWarning}`
                    : `Warrant accumulation with exercise option. ${pos.warrant.quantity} warrants convertible to shares.${warrantWarning}`,
                type: 'warrant',
                pos: pos,
                val: val
            };
        } else {
            return {
                winner: 'GME Common Stock',
                explanation: optionDaysLeft < 30 || warrantDaysLeft < 30 
                    ? `Time decay risk too high on derivatives. ${pos.stock.quantity} shares at $${state.stockPrice.toFixed(2)} is the safer aggressive play.`
                    : `Budget constraints favor stock accumulation. ${pos.stock.quantity} shares at $${state.stockPrice.toFixed(2)}.`,
                type: 'stock',
                pos: pos,
                val: val
            };
        }
    }
}

function update() {
    document.getElementById('displayStock').textContent = `$${state.stockPrice.toFixed(2)}`;
    document.getElementById('displayWarrant').textContent = `$${state.warrantPrice.toFixed(2)}`;
    document.getElementById('displayCall').innerHTML = `$${(state.callPrice * 100).toFixed(0)}<span style="font-size: 1rem; color: var(--text-secondary)">/contract</span>`;
    
    document.getElementById('callPerShare').textContent = `$${state.callPrice.toFixed(2)}`;
    document.getElementById('warrantLeverage').textContent = `${(state.stockPrice / state.warrantPrice).toFixed(1)}x`;
    document.getElementById('callLeverage').textContent = `${(state.stockPrice / state.callPrice).toFixed(1)}x`;
    
    const rec = getRecommendation();
    
    document.getElementById('recommendation').textContent = rec.winner;
    document.getElementById('explanation').innerHTML = `<p>${rec.explanation}</p>`;
    document.getElementById('resultsTitle').textContent = `Projected Returns at $${state.targetPrice} Target (${state.strategy === 'sell' ? 'Sell Strategy' : 'Exercise Strategy'})`;
    
    let breakdown = '';
    if (rec.type === 'stock') {
        breakdown = `
            <div><strong>Quantity:</strong> ${rec.pos.stock.quantity} shares</div>
            <div><strong>Entry Cost:</strong> $${rec.pos.stock.totalCost.toFixed(2)}</div>
            <div><strong>Value at $${state.targetPrice}:</strong> $${rec.val.stock.value.toFixed(2)}</div>
            <div><strong>Profit:</strong> $${rec.val.stock.profit.toFixed(2)}</div>
            <div><strong>ROI:</strong> ${rec.val.stock.roi.toFixed(1)}%</div>
        `;
    } else if (rec.type === 'warrant') {
        if (state.strategy === 'sell') {
            breakdown = `
                <div><strong>Quantity:</strong> ${rec.pos.warrant.quantity} warrants</div>
                <div><strong>Entry Cost:</strong> $${rec.pos.warrant.totalCost.toFixed(2)}</div>
                <div><strong>Est. Warrant Value at $${state.targetPrice}:</strong> $${rec.val.warrant.sell.value.toFixed(2)}</div>
                <div><strong>Profit (Sell Only):</strong> $${rec.val.warrant.sell.profit.toFixed(2)}</div>
                <div><strong>ROI:</strong> ${rec.val.warrant.sell.roi.toFixed(1)}%</div>
            `;
        } else {
            breakdown = `
                <div><strong>Quantity:</strong> ${rec.pos.warrant.quantity} warrants</div>
                <div><strong>Entry Cost:</strong> $${rec.pos.warrant.totalCost.toFixed(2)}</div>
                <div><strong>Exercise Cost:</strong> $${rec.pos.warrant.totalExerciseCost.toFixed(2)}</div>
                <div><strong>Total Investment:</strong> $${(rec.pos.warrant.totalCost + rec.pos.warrant.totalExerciseCost).toFixed(2)}</div>
                <div><strong>Value at $${state.targetPrice}:</strong> $${rec.val.warrant.exercise.value.toFixed(2)}</div>
                <div><strong>Profit:</strong> $${rec.val.warrant.exercise.profit.toFixed(2)}</div>
                <div><strong>ROI:</strong> ${rec.val.warrant.exercise.roi.toFixed(1)}%</div>
            `;
        }
    } else if (rec.type === 'call') {
        if (state.strategy === 'sell') {
            breakdown = `
                <div><strong>Quantity:</strong> ${rec.pos.call.quantity} contract${rec.pos.call.quantity !== 1 ? 's' : ''}</div>
                <div><strong>Premium Cost:</strong> $${rec.pos.call.totalPremiumCost.toFixed(2)}</div>
                <div><strong>Controls:</strong> ${rec.pos.call.quantity * 100} shares of upside</div>
                <div><strong>Est. Contract Value at $${state.targetPrice}:</strong> $${rec.val.call.sell.value.toFixed(2)}</div>
                <div><strong>Profit (Sell Only):</strong> $${rec.val.call.sell.profit.toFixed(2)}</div>
                <div><strong>ROI:</strong> ${rec.val.call.sell.roi.toFixed(1)}%</div>
            `;
        } else {
            breakdown = `
                <div><strong>Quantity:</strong> ${rec.pos.call.quantity} contract${rec.pos.call.quantity !== 1 ? 's' : ''}</div>
                <div><strong>Premium Cost:</strong> $${rec.pos.call.totalPremiumCost.toFixed(2)}</div>
                <div><strong>Exercise Cost:</strong> $${rec.pos.call.totalExerciseCost.toFixed(0)}</div>
                <div><strong>Total Investment:</strong> $${(rec.pos.call.totalPremiumCost + rec.pos.call.totalExerciseCost).toFixed(2)}</div>
                <div><strong>Shares Owned:</strong> ${rec.pos.call.quantity * 100}</div>
                <div><strong>Value at $${state.targetPrice}:</strong> $${rec.val.call.exercise.value.toFixed(2)}</div>
                <div><strong>Profit:</strong> $${rec.val.call.exercise.profit.toFixed(2)}</div>
                <div><strong>ROI:</strong> ${rec.val.call.exercise.roi.toFixed(1)}%</div>
            `;
        }
    }
    
    document.getElementById('breakdown').innerHTML = breakdown;
    
    document.getElementById('strategyNote').textContent = state.strategy === 'sell' 
        ? 'Sell Strategy = Trade warrants/options for profit without exercising. No additional capital needed beyond entry cost. Pure leverage play.'
        : 'Exercise Strategy = Convert warrants/options to shares. Requires full exercise capital. Builds long-term equity position.';
}

console.log('Initializing GME Decision Engine...');
updateCountdowns();
update();
updateBestValueNow();

setInterval(updateCountdowns, 1000);
fetchLivePrices();
