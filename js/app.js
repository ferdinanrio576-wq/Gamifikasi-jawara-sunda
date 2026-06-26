// Jawara Sunda - Gamifikasi Bahasa Sunda
// Logika utama aplikasi

class JawaraSunda {
    constructor() {
        this.currentUser = null;
        this.currentMaterial = null;
        this.currentQuiz = null;
        this.quizTimer = null;
        this.quizTimeLeft = 60;
        this.quizScore = 0;
        this.currentQuestionIndex = 0;
        this.quizQuestions = [];
        this.selectedAvatar = 1; // Default avatar
        this.audio = document.getElementById('background-music');
        this.audioToggleBtn = document.getElementById('audio-toggle-btn');
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateAudioButton();
        this.cleanCorruptedData(); // Clean corrupted data before loading
        this.checkLogin();
        this.loadLeaderboard();
    }

    startMusic() {
        if (!this.audio) {
            console.log('Audio element not found');
            return;
        }

        if (this.audio.paused) {
            this.audio.muted = false;
            this.audio.play().then(() => {
                console.log('Music started playing successfully');
            }).catch(e => {
                console.log('Audio play failed:', e.message);
                this.showNotification('Klik tombol musik lagi atau muat ulang halaman untuk memutar suara.', 'error');
            });
        }
    }

    playMusic() {
        if (this.audio && !this.audio.muted) {
            this.audio.play().catch(e => {
                console.log('Audio play failed after user interaction:', e.message);
            });
        }
    }

    toggleAudio() {
        if (!this.audio) {
            return;
        }

        if (this.audio.muted) {
            this.audio.muted = false;
            this.startMusic();
        } else {
            this.audio.muted = true;
        }

        this.updateAudioButton();
    }

    updateAudioButton() {
        if (!this.audioToggleBtn) {
            return;
        }

        this.audioToggleBtn.textContent = this.audio && this.audio.muted ? '🔇' : '🔊';
    }

    cleanCorruptedData() {
        // Clean up any corrupted points data in localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('jawaraSunda_user_')) {
                try {
                    const user = JSON.parse(localStorage.getItem(key));
                    if (user && user.points) {
                        const points = Number(user.points);
                        // Check if points looks corrupted (string concatenation, huge number, etc)
                        if (isNaN(points) || points > 10000 || String(points).length > 4) {
                            // Recalculate from activities
                            let calcPoints = 0;
                            if (user.completedMaterials && user.completedMaterials.length > 0) {
                                calcPoints += user.completedMaterials.length * 15;
                            }
                            if (user.quizHistory && user.quizHistory.length > 0) {
                                user.quizHistory.forEach(q => {
                                    calcPoints += Math.max(0, Math.floor(Number(q.score) || 0));
                                });
                            }
                            user.points = calcPoints;
                            localStorage.setItem(key, JSON.stringify(user));
                        }
                    }
                } catch (e) {
                    console.warn('Could not clean user data:', key);
                }
            }
        }
    }

    bindEvents() {
        // Login
        document.getElementById('login-btn').addEventListener('click', () => this.login());
        document.body.addEventListener('click', () => this.startMusic(), { once: true });
        if (this.audioToggleBtn) {
            this.audioToggleBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                this.toggleAudio();
            });
        }

        // Navigation
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
        document.getElementById('learn-btn').addEventListener('click', () => this.showLearning());
        document.getElementById('quiz-btn').addEventListener('click', () => this.startQuiz());
        document.getElementById('leaderboard-btn').addEventListener('click', () => this.showLeaderboard());
        document.getElementById('progress-btn').addEventListener('click', () => this.showProgress());
        document.getElementById('badges-btn').addEventListener('click', () => this.showBadges());

        // Back buttons
        document.getElementById('back-to-dashboard').addEventListener('click', () => this.showDashboard());
        document.getElementById('back-to-materials').addEventListener('click', () => this.showLearning());
        document.getElementById('back-to-dashboard-quiz').addEventListener('click', () => this.showDashboard());
        document.getElementById('back-to-dashboard-lb').addEventListener('click', () => this.showDashboard());
        document.getElementById('back-to-dashboard-prog').addEventListener('click', () => this.showDashboard());
        document.getElementById('back-to-dashboard-badge').addEventListener('click', () => this.showDashboard());

        // Material actions
        document.getElementById('complete-material-btn').addEventListener('click', () => this.completeMaterial());
        document.getElementById('start-quiz-from-material-btn').addEventListener('click', () => this.startQuiz());

        // Quiz actions
        document.getElementById('next-question-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('retry-quiz-btn').addEventListener('click', () => this.startQuiz());
        document.getElementById('back-to-dashboard-result').addEventListener('click', () => this.showDashboard());

        // Challenge
        document.getElementById('claim-challenge-btn').addEventListener('click', () => this.claimChallenge());
    }

    checkLogin() {
        const savedUser = localStorage.getItem('jawaraSunda_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
            this.checkDailyLogin();
        }
    }

    login() {
        const username = document.getElementById('username').value.trim();
        if (!username) {
            this.showNotification('Masukkan nama kamu dulu!', 'error');
            return;
        }

        // Check if user exists
        let user = JSON.parse(localStorage.getItem(`jawaraSunda_user_${username}`));
        if (!user) {
            // Create new user
            user = {
                name: username,
                avatar: this.selectedAvatar,
                points: 0,
                level: 1,
                streak: 0,
                lastLogin: null,
                completedMaterials: [],
                quizHistory: [],
                badges: [],  // Track which badge tiers are unlocked
                badgeTiers: {}, // Track tier progress for each badge
                bestQuizScore: 0,
                perfectQuizScores: 0,  // Track perfect scores for badge tier
                fastestQuizTime: null,  // Track fastest quiz completion time in seconds
                loginCount: 0,
                dailyLoginClaimed: false,
                dailyChallenge: null,  // Track current daily challenge
                createdDate: new Date().toDateString()
            };
        }

        // Update login info
        const today = new Date().toDateString();
        if (user.lastLogin !== today) {
            user.loginCount++;
            if (user.lastLogin === new Date(Date.now() - 86400000).toDateString()) {
                user.streak++;
            } else {
                user.streak = 1;
            }
            user.lastLogin = today;
            user.dailyLoginClaimed = false;
        }

        // Force numeric values for user data loaded from localStorage
        user.points = Math.max(0, Math.floor(Number(user.points) || 0));
        user.level = Math.max(1, Math.floor(Number(user.level) || 1));
        user.streak = Math.max(0, Math.floor(Number(user.streak) || 0));
        user.bestQuizScore = Math.max(0, Math.floor(Number(user.bestQuizScore) || 0));
        user.perfectQuizScores = Math.max(0, Math.floor(Number(user.perfectQuizScores) || 0));
        
        // Initialize fastestQuizTime if not present (for old user data)
        if (!user.fastestQuizTime) {
            user.fastestQuizTime = null;
        }

        // Validate points - if it looks corrupted (string concatenation), recalculate from activities
        if (isNaN(user.points) || user.points > 10000 || String(user.points).length > 4) {
            // Recalculate points from activities
            let calculatedPoints = 0;
            if (user.completedMaterials && user.completedMaterials.length > 0) {
                calculatedPoints += user.completedMaterials.length * 15; // 15 points per material
            }
            if (user.quizHistory && user.quizHistory.length > 0) {
                user.quizHistory.forEach(quiz => {
                    calculatedPoints += Math.max(0, Math.floor(Number(quiz.score) || 0));
                });
            }
            user.points = Math.max(0, Math.floor(calculatedPoints));
        }

        this.currentUser = user;
        localStorage.setItem('jawaraSunda_user', JSON.stringify(user));
        localStorage.setItem(`jawaraSunda_user_${username}`, JSON.stringify(user));

        this.showDashboard();
        this.checkBadges();
        this.startMusic();
        this.showNotification(`Selamat datang, ${username}!`, 'success');
    }

    initAvatarPicker() {
        const avatarPicker = document.getElementById('avatar-picker');
        avatarPicker.innerHTML = '';

        avatarOptions.forEach(avatar => {
            const avatarBtn = document.createElement('button');
            avatarBtn.className = 'avatar-option';
            avatarBtn.dataset.avatar = avatar.emoji;
            avatarBtn.innerHTML = `
                <span class="avatar-emoji">${avatar.emoji}</span>
                <span class="avatar-name">${avatar.name}</span>
            `;
            avatarBtn.onclick = () => this.selectAvatar(avatarBtn);
            avatarPicker.appendChild(avatarBtn);
        });

        // Select default avatar
        const defaultAvatar = avatarPicker.querySelector('.avatar-option');
        if (defaultAvatar) {
            this.selectAvatar(defaultAvatar);
        }
    }

    selectAvatar(button) {
        document.querySelectorAll('.avatar-option').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        // Find the avatar id based on the emoji
        const selectedEmoji = button.dataset.avatar;
        const avatarData = avatarOptions.find(avatar => avatar.emoji === selectedEmoji);
        this.selectedAvatar = avatarData ? avatarData.id : 1;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('jawaraSunda_user');
        this.showLogin();
    }

    checkDailyLogin() {
        const today = new Date().toDateString();
        if (this.currentUser.lastLogin !== today) {
            this.currentUser.dailyLoginClaimed = false;
        }
    }

    claimChallenge() {
        if (this.currentUser.dailyLoginClaimed) {
            this.showNotification('Challenge harian sudah diklaim!', 'info');
            return;
        }

        this.addPoints(5, 'Login harian');
        this.currentUser.dailyLoginClaimed = true;
        this.saveUser();
        this.updateDashboard();
        this.showNotification('Challenge harian berhasil diklaim! +5 poin', 'success');
        document.getElementById('claim-challenge-btn').disabled = true;
        document.getElementById('claim-challenge-btn').textContent = 'Sudah Diklaim';
    }

    showLogin() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        document.getElementById('login-screen').classList.remove('hidden');
        this.initAvatarPicker();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showDashboard() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        document.getElementById('dashboard').classList.remove('hidden');
        this.updateDashboard();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateDashboard() {
        // Update avatar
        const avatarData = avatarOptions.find(a => a.id === this.currentUser.avatar);
        const avatarEmoji = avatarData ? avatarData.emoji : '👦';
        const avatarElement = document.querySelector('.dashboard-header .avatar');
        if (avatarElement) {
            avatarElement.textContent = avatarEmoji;
        }

        document.getElementById('user-name').textContent = this.currentUser.name;
        const safePoints = Math.max(0, Math.floor(Number(this.currentUser.points) || 0));
        const safeLevel = Math.max(1, Math.floor(Number(this.currentUser.level) || 1));
        document.getElementById('user-points').textContent = String(safePoints);
        document.getElementById('user-level').textContent = String(safeLevel);
        document.getElementById('level-name').textContent = levelNames[safeLevel - 1] || 'Master Sunda';

        // Update progress bar
        const pointsToNext = 100;
        const currentLevelPoints = Math.max(0, safePoints - ((safeLevel - 1) * 100));
        const progressPercent = Math.min((currentLevelPoints / pointsToNext) * 100, 100);
        document.getElementById('points-progress').style.width = progressPercent + '%';
        document.getElementById('points-to-next').textContent = String(Math.max(0, pointsToNext - currentLevelPoints));

        document.getElementById('user-streak').textContent = this.currentUser.streak;
        document.getElementById('completed-materials-count').textContent = this.currentUser.completedMaterials.length;
        
        // Display global fastest quiz time with username
        const fastestTimeElement = document.getElementById('fastest-quiz-time');
        if (fastestTimeElement) {
            let globalFastest = JSON.parse(localStorage.getItem('jawaraSunda_globalFastestTime'));
            if (globalFastest && globalFastest.time) {
                const minutes = Math.floor(globalFastest.time / 60);
                const seconds = globalFastest.time % 60;
                let timeDisplay = '';
                if (minutes > 0) {
                    timeDisplay = `${minutes}m ${seconds}s`;
                } else {
                    timeDisplay = `${seconds}s`;
                }
                fastestTimeElement.textContent = `${globalFastest.username} - ${timeDisplay}`;
            } else {
                fastestTimeElement.textContent = '-';
            }
        }

        // Update header badge summary
        const topBadge = this.getTopBadgeSummary();
        const tierEmoji = { bronze: '🥉', silver: '🥈', gold: '🥇' };
        const headerBadge = document.getElementById('header-badge');
        if (headerBadge) {
            headerBadge.textContent = topBadge
                ? `${topBadge.badge.icon} ${topBadge.badge.name} ${tierEmoji[topBadge.tier]}`
                : '🎖️ Belum ada badge';
        }

        // Update challenge button
        const challengeBtn = document.getElementById('claim-challenge-btn');
        if (this.currentUser.dailyLoginClaimed) {
            challengeBtn.disabled = true;
            challengeBtn.textContent = 'Sudah Diklaim Hari Ini';
        } else {
            challengeBtn.disabled = false;
            challengeBtn.textContent = 'Klaim Reward (+5 poin)';
        }
    }

    showLearning() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        document.getElementById('learning-screen').classList.remove('hidden');
        this.renderMaterials();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderMaterials() {
        const container = document.getElementById('materials-list');
        container.innerHTML = '';

        materials.forEach(material => {
            const card = document.createElement('div');
            card.className = 'material-card';
            if (material.level > this.currentUser.level) {
                card.classList.add('locked');
                card.onclick = () => this.showNotification('Level kamu belum cukup! Naik level dulu ya!', 'info');
            } else {
                card.onclick = () => this.showMaterial(material);
            }

            const isCompleted = this.currentUser.completedMaterials.includes(material.id);
            if (isCompleted) {
                card.classList.add('completed');
            }

            card.innerHTML = `
                <h3>${material.title}</h3>
                <p>${material.content.substring(0, 100)}...</p>
                <span class="level-badge">Level ${material.level}</span>
                ${isCompleted ? '<div class="completion-status">✅ Selesai</div>' : ''}
            `;
            container.appendChild(card);
        });
    }

    showMaterial(material) {
        this.currentMaterial = material;
        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        document.getElementById('material-view').classList.remove('hidden');

        document.getElementById('material-title').textContent = material.title;
        document.getElementById('material-breadcrumb').textContent = material.title;
        document.getElementById('material-content').innerHTML = material.content;
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    completeMaterial() {
        if (!this.currentUser.completedMaterials.includes(this.currentMaterial.id)) {
            this.currentUser.completedMaterials.push(this.currentMaterial.id);
            this.addPoints(15, 'Selesai materi');
            this.saveUser();
            this.checkBadges();
            this.showNotification(`Selamat! Kamu dapat 15 poin!`, 'success');
        }
        this.showLearning();
    }

    startQuiz() {
        // Get quiz questions for the current material
        let questionsToUse = quizQuestions; // Fallback to old array if no material selected
        
        if (this.currentMaterial && materialQuizzes[this.currentMaterial.id]) {
            // Use material-specific questions
            questionsToUse = materialQuizzes[this.currentMaterial.id];
        } else if (Object.keys(materialQuizzes).length > 0) {
            // If no current material, use questions from first available material
            const firstMaterialId = Object.keys(materialQuizzes)[0];
            questionsToUse = materialQuizzes[firstMaterialId];
        }
        
        this.quizQuestions = [...questionsToUse].sort(() => Math.random() - 0.5).slice(0, 5);
        this.currentQuestionIndex = 0;
        this.quizScore = 0;
        this.quizTimeLeft = 60;

        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        document.getElementById('quiz-screen').classList.remove('hidden');
        document.getElementById('quiz-result').classList.add('hidden');
        document.getElementById('quiz-content').classList.remove('hidden');

        // Display material name
        if (this.currentMaterial) {
            document.getElementById('quiz-material-title').textContent = `📚 Materi: ${this.currentMaterial.title}`;
        } else {
            document.getElementById('quiz-material-title').textContent = '📚 Materi: Kuis Umum';
        }

        this.showQuestion();
        this.startTimer();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showQuestion() {
        const question = this.quizQuestions[this.currentQuestionIndex];
        document.getElementById('question-text').textContent = question.question;
        
        // Update question progress
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.quizQuestions.length;

        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.onclick = () => this.selectAnswer(index);
            optionsContainer.appendChild(btn);
        });

        document.getElementById('next-question-btn').classList.add('hidden');
    }

    selectAnswer(selectedIndex) {
        const question = this.quizQuestions[this.currentQuestionIndex];
        const buttons = document.querySelectorAll('.option-btn');
        const isCorrect = selectedIndex === question.correct;

        buttons.forEach((btn, index) => {
            btn.onclick = null;  // Disable further clicking
            btn.disabled = true;
            
            if (index === question.correct) {
                btn.classList.add('correct-answer');
                if (isCorrect) {
                    btn.classList.add('selected-correct');
                    this.showFeedback('correct');
                }
            } else if (index === selectedIndex && !isCorrect) {
                btn.classList.add('incorrect-answer');
                this.showFeedback('incorrect');
            }
        });

        if (isCorrect) {
            this.quizScore += 20;
        }

        // Show next button after feedback delay
        setTimeout(() => {
            document.getElementById('next-question-btn').classList.remove('hidden');
        }, 1200);  // Delay to let feedback animation play
    }

    showFeedback(type) {
        const container = document.getElementById('question-container');
        const feedback = document.createElement('div');
        feedback.className = `quiz-feedback feedback-${type}`;
        
        if (type === 'correct') {
            feedback.innerHTML = `
                <div class="feedback-content">
                    <span class="feedback-emoji">✅</span>
                    <span class="feedback-text">Benar!</span>
                </div>
            `;
            feedback.style.animation = 'feedbackCorrect 1.5s ease-out';
        } else {
            feedback.innerHTML = `
                <div class="feedback-content">
                    <span class="feedback-emoji">❌</span>
                    <span class="feedback-text">Tidak tepat!</span>
                </div>
            `;
            feedback.style.animation = 'feedbackIncorrect 1.5s ease-out';
        }
        
        container.appendChild(feedback);
        setTimeout(() => feedback.remove(), 1500);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.quizQuestions.length) {
            this.showQuestion();
        } else {
            this.endQuiz();
        }
    }

    startTimer() {
        this.quizTimer = setInterval(() => {
            this.quizTimeLeft--;
            document.getElementById('time-left').textContent = this.quizTimeLeft;

            if (this.quizTimeLeft <= 0) {
                this.endQuiz();
            }
        }, 1000);
    }

    endQuiz() {
        clearInterval(this.quizTimer);

        // Calculate time taken (60 - remaining time)
        const timeTaken = 60 - this.quizTimeLeft;

        // Check if score is below KKM (60)
        const isBelowKKM = this.quizScore < 60;

        // Only add points if score is 60 or above
        if (!isBelowKKM) {
            this.addPoints(this.quizScore, 'Kuis');

            // Bonus for perfect score
            if (this.quizScore === 100) {
                this.currentUser.perfectQuizScores++;  // Track for tiered badge
                this.addPoints(10, 'Perfect score bonus');
            }

            // Update best score
            if (this.quizScore > this.currentUser.bestQuizScore) {
                this.currentUser.bestQuizScore = this.quizScore;
            }

            // Track fastest quiz time (only if passed and time is less than fastest)
            if (!this.currentUser.fastestQuizTime || timeTaken < this.currentUser.fastestQuizTime) {
                this.currentUser.fastestQuizTime = timeTaken;
            }

            // Update global fastest time record
            let globalFastest = JSON.parse(localStorage.getItem('jawaraSunda_globalFastestTime'));
            if (!globalFastest || timeTaken < globalFastest.time) {
                globalFastest = {
                    time: timeTaken,
                    username: this.currentUser.name,
                    date: new Date().toISOString()
                };
                localStorage.setItem('jawaraSunda_globalFastestTime', JSON.stringify(globalFastest));
            }
        }

        this.currentUser.quizHistory.push({
            score: this.quizScore,
            date: new Date().toISOString(),
            status: isBelowKKM ? 'belowKKM' : 'passed',
            timeTaken: timeTaken
        });

        this.saveUser();
        this.checkBadges();

        document.getElementById('quiz-content').classList.add('hidden');
        document.getElementById('quiz-result').classList.remove('hidden');

        const scoreDisplay = document.getElementById('score-text');
        
        if (isBelowKKM) {
            // Show "Below KKM" message
            scoreDisplay.innerHTML = `
                <div id="score-display" style="color: #e74c3c; font-size: 2em; font-weight: bold; margin: 20px 0;">
                    ⚠️ DI BAWAH KKM
                </div>
                <div style="font-size: 1em; margin-top: 10px; color: #e74c3c;">
                    Skor Kamu: ${this.quizScore}/100 (Minimal: 60)
                </div>
                <div style="font-size: 0.9em; margin-top: 15px; color: #555;">
                    Poin tidak ditambahkan. Coba lagi untuk mendapatkan skor minimal 60.
                </div>
            `;
            scoreDisplay.style.animation = 'shake 0.5s ease-out';
            this.showNotification(`Kuis selesai! Skor: ${this.quizScore}/100 - Di bawah KKM 😢`, 'warning');
        } else {
            // Show normal score
            scoreDisplay.innerHTML = `
                <div id="score-display">${this.quizScore}</div>
                <div style="font-size: 0.8em; margin-top: 10px;">dari 100 poin</div>
            `;

            // Add celebration animation for high scores
            if (this.quizScore >= 80) {
                scoreDisplay.style.animation = 'bounceIn 1s ease-out';
            }

            this.showNotification(`Kuis selesai! Skor: ${this.quizScore}/100 ✨`, 'success');
        }
    }

    showLeaderboard() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        document.getElementById('leaderboard-screen').classList.remove('hidden');
        this.loadLeaderboard();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    loadLeaderboard() {
        const users = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('jawaraSunda_user_')) {
                const user = JSON.parse(localStorage.getItem(key));
                user.points = Number(user.points) || 0;
                user.level = Number(user.level) || 1;
                user.streak = Number(user.streak) || 0;
                users.push(user);
            }
        }

        users.sort((a, b) => b.points - a.points);

        // Update total players
        document.getElementById('total-players').textContent = users.length;

        // Top 3 podium
        this.renderTop3(users);

        // Full leaderboard list
        this.renderLeaderboardList(users);
    }

    renderTop3(users) {
        const top3 = users.slice(0, 3);

        // First place
        if (top3[0]) {
            document.getElementById('first-name').textContent = top3[0].name;
            document.getElementById('first-points').textContent = `${top3[0].points} poin`;
            document.getElementById('first-level').textContent = `Level ${top3[0].level}`;
        }

        // Second place
        if (top3[1]) {
            document.getElementById('second-name').textContent = top3[1].name;
            document.getElementById('second-points').textContent = `${top3[1].points} poin`;
            document.getElementById('second-level').textContent = `Level ${top3[1].level}`;
        }

        // Third place
        if (top3[2]) {
            document.getElementById('third-name').textContent = top3[2].name;
            document.getElementById('third-points').textContent = `${top3[2].points} poin`;
            document.getElementById('third-level').textContent = `Level ${top3[2].level}`;
        }
    }

    renderLeaderboardList(users) {
        const container = document.getElementById('leaderboard-list');
        container.innerHTML = '';

        const startIndex = 3; // Skip top 3
        const displayUsers = users.slice(startIndex, startIndex + 10); // Show next 10

        displayUsers.forEach((user, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            if (user.name === this.currentUser.name) {
                item.classList.add('current-user');
            }

            const rank = startIndex + index + 1;
            item.innerHTML = `
                <div class="rank-number">${rank}</div>
                <div class="player-avatar">${user.name.charAt(0).toUpperCase()}</div>
                <div class="player-details">
                    <div class="name">${user.name}</div>
                    <div class="stats">
                        <span>Level ${user.level}</span>
                        <span>Streak ${user.streak}</span>
                        <span>Badge ${user.badges.length}</span>
                    </div>
                </div>
                <div class="player-points">${user.points}</div>
            `;
            container.appendChild(item);
        });

        // Your rank card
        this.renderYourRank(users);
    }

    renderYourRank(users) {
        const yourRank = users.findIndex(user => user.name === this.currentUser.name) + 1;
        const yourRankCard = document.getElementById('your-rank-card');

        if (yourRank > 0) {
            yourRankCard.innerHTML = `
                <div style="font-size: 3em; margin-bottom: 10px;">🏅</div>
                <h3>Peringkat Kamu: #${yourRank}</h3>
                <p>Dari ${users.length} pemain</p>
                <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold;">${this.currentUser.points}</div>
                        <div>Poin</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold;">${this.currentUser.level}</div>
                        <div>Level</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2em; font-weight: bold;">${this.currentUser.streak}</div>
                        <div>Streak</div>
                    </div>
                </div>
            `;
        } else {
            yourRankCard.innerHTML = '<p>Data kamu tidak ditemukan</p>';
        }
    }

    showProgress() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        document.getElementById('progress-screen').classList.remove('hidden');

        const progressContent = document.getElementById('progress-content');
        progressContent.innerHTML = `
            <h3>📊 Progress Belajar Kamu</h3>
            <div class="progress-item">
                <span class="label">Level Saat Ini</span>
                <span class="value">${this.currentUser.level} (${levelNames[this.currentUser.level - 1] || 'Master Sunda'})</span>
            </div>
            <div class="progress-item">
                <span class="label">Total Poin</span>
                <span class="value">${this.currentUser.points}</span>
            </div>
            <div class="progress-item">
                <span class="label">Materi Selesai</span>
                <span class="value">${this.currentUser.completedMaterials.length} dari 5</span>
            </div>
            <div class="progress-item">
                <span class="label">Kuis Dikerjakan</span>
                <span class="value">${this.currentUser.quizHistory.length}</span>
            </div>
            <div class="progress-item">
                <span class="label">Skor Terbaik Kuis</span>
                <span class="value">${this.currentUser.bestQuizScore}/100</span>
            </div>
            <div class="progress-item">
                <span class="label">Streak Login</span>
                <span class="value">${this.currentUser.streak} hari</span>
            </div>
            <div class="progress-item">
                <span class="label">Badge Didapat</span>
                <span class="value">${this.currentUser.badges.length} dari 5</span>
            </div>
            <div class="progress-item">
                <span class="label">Tanggal Bergabung</span>
                <span class="value">${new Date(this.currentUser.lastLogin).toLocaleDateString('id-ID')}</span>
            </div>
        `;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showBadges() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        document.getElementById('badges-screen').classList.remove('hidden');

        const container = document.getElementById('badges-list');
        container.innerHTML = '';

        badges.forEach(badge => {
            const card = document.createElement('div');
            card.className = 'badge-card-container';

            const currentTier = this.currentUser.badgeTiers?.[badge.id] || 'none';
            
            let tierHTML = '';
            badge.tiers.forEach(tierData => {
                const isUnlocked = currentTier === tierData.tier || 
                    (tierData.tier === 'bronze' && currentTier !== 'none') ||
                    (tierData.tier === 'silver' && (currentTier === 'silver' || currentTier === 'gold')) ||
                    (tierData.tier === 'gold' && currentTier === 'gold');

                const tierEmoji = {
                    'bronze': '🥉',
                    'silver': '🥈',
                    'gold': '🥇'
                };

                const tierClass = isUnlocked ? 'tier-unlocked' : 'tier-locked';
                tierHTML += `
                    <div class="badge-tier ${tierClass}">
                        <span class="tier-icon">${tierEmoji[tierData.tier]}</span>
                        <span class="tier-name">${tierData.tier.toUpperCase()}</span>
                        <small>${tierData.reward}</small>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="badge-main">
                    <div class="badge-icon">${badge.icon}</div>
                    <h4>${badge.name}</h4>
                    <p>${badge.description}</p>
                </div>
                <div class="badge-tiers">
                    ${tierHTML}
                </div>
            `;
            container.appendChild(card);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    getTopBadgeSummary() {
        const tierOrder = { none: 0, bronze: 1, silver: 2, gold: 3 };
        let best = null;

        badges.forEach(badge => {
            const tier = this.currentUser.badgeTiers?.[badge.id] || 'none';
            if (!best || tierOrder[tier] > tierOrder[best.tier]) {
                best = { badge, tier };
            }
        });

        if (best && best.tier !== 'none') {
            return best;
        }
        return null;
    }

    checkBadgeRequirement(badge) {
        return this.currentUser.badges.includes(badge.id);
    }

    checkBadges() {
        // Check all badges and their tiers
        const tierOrder = { none: 0, bronze: 1, silver: 2, gold: 3 };
        badges.forEach(badge => {
            if (!this.currentUser.badgeTiers) {
                this.currentUser.badgeTiers = {};
            }
            if (!this.currentUser.badgeTiers[badge.id]) {
                this.currentUser.badgeTiers[badge.id] = 'none';  // none, bronze, silver, gold
            }

            const currentTier = this.currentUser.badgeTiers[badge.id];
            const highestAvailableTier = badge.tiers
                .filter(tierData => this.meetsBadgeRequirement(tierData.requirement))
                .reduce((best, tierData) => {
                    return tierOrder[tierData.tier] > tierOrder[best.tier] ? tierData : best;
                }, { tier: 'none' });

            if (tierOrder[highestAvailableTier.tier] > tierOrder[currentTier]) {
                this.unlockBadgeTier(badge, highestAvailableTier);
            }
        });
        this.saveUser();
    }

    meetsBadgeRequirement(requirement) {
        for (let key in requirement) {
            if (this.currentUser[key] === undefined || this.currentUser[key] < requirement[key]) {
                return false;
            }
        }
        return true;
    }

    unlockBadgeTier(badge, tierData) {
        const currentTier = this.currentUser.badgeTiers[badge.id];
        const tierEmoji = {
            'bronze': '🥉',
            'silver': '🥈',
            'gold': '🥇'
        };

        this.currentUser.badgeTiers[badge.id] = tierData.tier;
        if (!this.currentUser.badges.includes(badge.id)) {
            this.currentUser.badges.push(badge.id);
        }
        this.addPoints(tierData.reward.split('+')[1].trim().split(' ')[0], `Badge tier: ${badge.name}`);
        
        const tier = tierData.tier;
        const message = `🎉 ${badge.name} ${tierEmoji[tier]} ${tier.toUpperCase()}!`;
        this.showNotification(message, 'success');
    }

    addPoints(points, reason) {
        // Strict type conversion and validation
        const numericPoints = Math.max(0, Math.floor(Number(points) || 0));
        
        // Ensure points is a number before arithmetic operation
        if (typeof this.currentUser.points !== 'number' || isNaN(this.currentUser.points)) {
            this.currentUser.points = 0;
        }
        
        this.currentUser.points = Math.max(0, Math.floor(this.currentUser.points));
        this.currentUser.points += numericPoints;

        // Level up check
        const newLevel = Math.floor(this.currentUser.points / 100) + 1;
        const currentLevel = Math.max(1, Math.floor(Number(this.currentUser.level) || 1));
        if (newLevel > currentLevel) {
            this.currentUser.level = newLevel;
            this.showNotification(`Level up! Sekarang level ${newLevel}`, 'success');
        }

        this.saveUser();
    }

    saveUser() {
        // Ensure all numeric fields are properly typed before saving
        this.currentUser.points = Math.max(0, Math.floor(Number(this.currentUser.points) || 0));
        this.currentUser.level = Math.max(1, Math.floor(Number(this.currentUser.level) || 1));
        this.currentUser.streak = Math.max(0, Math.floor(Number(this.currentUser.streak) || 0));
        this.currentUser.bestQuizScore = Math.max(0, Math.floor(Number(this.currentUser.bestQuizScore) || 0));
        this.currentUser.perfectQuizScores = Math.max(0, Math.floor(Number(this.currentUser.perfectQuizScores) || 0));
        
        localStorage.setItem('jawaraSunda_user', JSON.stringify(this.currentUser));
        localStorage.setItem(`jawaraSunda_user_${this.currentUser.name}`, JSON.stringify(this.currentUser));
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;

        // Set different colors based on type
        const colors = {
            success: 'linear-gradient(45deg, #4CAF50, #45B7D1)',
            error: 'linear-gradient(45deg, #f44336, #FF5722)',
            info: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            warning: 'linear-gradient(45deg, #FF9800, #FF5722)'
        };

        notification.style.background = colors[type] || colors.success;

        notification.classList.remove('hidden');

        setTimeout(() => {
            notification.classList.add('hidden');
        }, 4000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new JawaraSunda();
});