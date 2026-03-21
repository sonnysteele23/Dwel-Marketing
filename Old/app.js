class PitchDeck {
    constructor() {
        this.currentSlideIndex = 0;
        this.totalSlides = 16;
        this.slides = document.querySelectorAll('.slide');
        this.slidesContainer = document.getElementById('slidesContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlideElement = document.getElementById('currentSlide');
        this.totalSlidesElement = document.getElementById('totalSlides');
        this.progressFill = document.getElementById('progressFill');
        
        this.init();
    }
    
    init() {
        // Set total slides
        this.totalSlidesElement.textContent = this.totalSlides;
        
        // Add event listeners with proper error checking
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.previousSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Initialize first slide
        this.updateSlide();
        this.updateProgress();
        this.updateNavButtons();
        
        // Add smooth entrance animation
        setTimeout(() => {
            if (this.slides[0]) {
                this.slides[0].classList.add('active');
            }
        }, 100);
        
        // CTA button handler - add after initialization
        setTimeout(() => {
            const ctaButton = document.querySelector('.cta-button');
            if (ctaButton) {
                ctaButton.addEventListener('click', () => this.handleCTAClick());
            }
        }, 500);
    }
    
    nextSlide() {
        if (this.currentSlideIndex < this.totalSlides - 1) {
            this.currentSlideIndex++;
            this.updateSlide();
            this.updateProgress();
            this.updateNavButtons();
        }
    }
    
    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.currentSlideIndex--;
            this.updateSlide();
            this.updateProgress();
            this.updateNavButtons();
        }
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlideIndex = index;
            this.updateSlide();
            this.updateProgress();
            this.updateNavButtons();
        }
    }
    
    updateSlide() {
        // Remove active class from all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        
        // Add appropriate classes
        this.slides.forEach((slide, index) => {
            if (index === this.currentSlideIndex) {
                slide.classList.add('active');
            } else if (index < this.currentSlideIndex) {
                slide.classList.add('prev');
            }
        });
        
        // Update slide counter
        if (this.currentSlideElement) {
            this.currentSlideElement.textContent = this.currentSlideIndex + 1;
        }
        
        // Trigger any slide-specific animations
        this.triggerSlideAnimations();
    }
    
    updateProgress() {
        const progressPercentage = ((this.currentSlideIndex + 1) / this.totalSlides) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progressPercentage}%`;
        }
    }
    
    updateNavButtons() {
        // Disable/enable navigation buttons based on current slide
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlideIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlideIndex === this.totalSlides - 1;
        }
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ': // Spacebar
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
            case 'Escape':
                e.preventDefault();
                // Could implement fullscreen exit or menu
                break;
        }
    }
    
    triggerSlideAnimations() {
        const currentSlide = this.slides[this.currentSlideIndex];
        if (!currentSlide) return;
        
        const slideNumber = this.currentSlideIndex + 1;
        
        // Add specific animations based on slide content
        switch(slideNumber) {
            case 1: // Title slide
                this.animateTitleSlide(currentSlide);
                break;
            case 2: // Massive Disruption
                this.animateDisruptionSlide(currentSlide);
                break;
            case 3: // Global Life Span
                this.animateLifespanSlide(currentSlide);
                break;
            case 4: // Aging in Place
                this.animateAgingSlide(currentSlide);
                break;
            case 5: // Productivity Impact
                this.animateProductivitySlide(currentSlide);
                break;
            case 6: // Mission & Vision
                this.animateMissionSlide(currentSlide);
                break;
            case 7: // Market Opportunity
                this.animateMarketSlide(currentSlide);
                break;
            case 8: // Platform Overview
                this.animatePlatformSlide(currentSlide);
                break;
            case 9: // AI Innovations
                this.animateInnovationSlide(currentSlide);
                break;
            case 10: // Technology Architecture
                this.animateArchitectureSlide(currentSlide);
                break;
            case 11: // Platform Architecture
                this.animatePlatformArchitectureSlide(currentSlide);
                break;
            case 12: // Leadership Team
                this.animateLeadershipSlide(currentSlide);
                break;
            case 13: // Board of Advisors
                this.animateAdvisorsSlide(currentSlide);
                break;
            case 14: // Go-To-Market
                this.animateGTMSlide(currentSlide);
                break;
            case 15: // Market Research
                this.animateResearchSlide(currentSlide);
                break;
            case 16: // Funding Ask
                this.animateFundingSlide(currentSlide);
                break;
            default:
                // Default entrance animation for other slides
                this.animateSlideElements(currentSlide);
                break;
        }
    }
    
    animateTitleSlide(slide) {
        const stats = slide.querySelectorAll('.stat-item');
        const taglines = slide.querySelectorAll('.tagline');
        
        // Animate taglines first
        taglines.forEach((tagline, index) => {
            tagline.style.opacity = '0';
            tagline.style.transform = 'translateY(20px)';
            setTimeout(() => {
                tagline.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                tagline.style.opacity = '1';
                tagline.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });
        
        // Then animate stats
        stats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(30px) scale(0.9)';
            setTimeout(() => {
                stat.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0) scale(1)';
            }, index * 150 + 1200);
        });
    }
    
    animateDisruptionSlide(slide) {
        const disruptionItems = slide.querySelectorAll('.disruption-item');
        const opportunityCard = slide.querySelector('.opportunity-card');
        
        disruptionItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px) rotateX(15deg)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) rotateX(0deg)';
            }, index * 200 + 300);
        });
        
        if (opportunityCard) {
            opportunityCard.style.opacity = '0';
            opportunityCard.style.transform = 'scale(0.8) translateY(30px)';
            setTimeout(() => {
                opportunityCard.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                opportunityCard.style.opacity = '1';
                opportunityCard.style.transform = 'scale(1) translateY(0)';
            }, 1000);
        }
    }
    
    animateLifespanSlide(slide) {
        const demoCards = slide.querySelectorAll('.demo-stat-card');
        const growthItems = slide.querySelectorAll('.growth-item');
        
        demoCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 100 + 200);
        });
        
        growthItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300 + 800);
        });
    }
    
    animateAgingSlide(slide) {
        const statLarge = slide.querySelectorAll('.stat-large');
        const factorItems = slide.querySelectorAll('.factor-item');
        
        statLarge.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateX(-50px)';
            setTimeout(() => {
                stat.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                stat.style.opacity = '1';
                stat.style.transform = 'translateX(0)';
            }, index * 300 + 200);
        });
        
        factorItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100 + 800);
        });
    }
    
    animateProductivitySlide(slide) {
        const impactStats = slide.querySelectorAll('.impact-stat');
        const fragItems = slide.querySelectorAll('.frag-item');
        
        impactStats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'scale(0.8) translateY(20px)';
            setTimeout(() => {
                stat.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                stat.style.opacity = '1';
                stat.style.transform = 'scale(1) translateY(0)';
            }, index * 150 + 200);
        });
        
        fragItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100 + 800);
        });
    }
    
    animateMissionSlide(slide) {
        const missionStatement = slide.querySelector('.mission-statement');
        const visionStatement = slide.querySelector('.vision-statement');
        const valuePillars = slide.querySelectorAll('.value-pillar');
        
        // Animate mission and vision
        [missionStatement, visionStatement].forEach((element, index) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateX(-30px)';
                setTimeout(() => {
                    element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                }, index * 300 + 200);
            }
        });
        
        // Animate value pillars
        valuePillars.forEach((pillar, index) => {
            pillar.style.opacity = '0';
            pillar.style.transform = 'translateY(40px)';
            setTimeout(() => {
                pillar.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                pillar.style.opacity = '1';
                pillar.style.transform = 'translateY(0)';
            }, index * 150 + 800);
        });
    }
    
    animateMarketSlide(slide) {
        const marketSegments = slide.querySelectorAll('.market-segment');
        const tamHighlight = slide.querySelector('.tam-highlight');
        
        marketSegments.forEach((segment, index) => {
            segment.style.opacity = '0';
            segment.style.transform = 'translateY(30px) scale(0.9)';
            setTimeout(() => {
                segment.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                segment.style.opacity = '1';
                segment.style.transform = 'translateY(0) scale(1)';
            }, index * 200 + 300);
        });
        
        if (tamHighlight) {
            tamHighlight.style.opacity = '0';
            tamHighlight.style.transform = 'scale(0.8) translateY(50px)';
            setTimeout(() => {
                tamHighlight.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                tamHighlight.style.opacity = '1';
                tamHighlight.style.transform = 'scale(1) translateY(0)';
            }, 800);
        }
    }
    
    animatePlatformSlide(slide) {
        const capabilityCards = slide.querySelectorAll('.capability-card');
        const features = slide.querySelectorAll('.feature');
        
        capabilityCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) rotateY(15deg)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateY(0deg)';
            }, index * 150 + 300);
        });
        
        features.forEach((feature, index) => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                feature.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, index * 80 + 800);
        });
    }
    
    animateInnovationSlide(slide) {
        const innovationCards = slide.querySelectorAll('.innovation-card');
        
        innovationCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) rotateX(15deg)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0deg)';
            }, index * 200 + 300);
        });
    }
    
    animateArchitectureSlide(slide) {
        const phases = slide.querySelectorAll('.phase');
        const components = slide.querySelectorAll('.component');
        
        phases.forEach((phase, index) => {
            phase.style.opacity = '0';
            phase.style.transform = 'translateY(50px)';
            setTimeout(() => {
                phase.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                phase.style.opacity = '1';
                phase.style.transform = 'translateY(0)';
            }, index * 200 + 200);
        });
        
        components.forEach((component, index) => {
            component.style.opacity = '0';
            component.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                component.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                component.style.opacity = '1';
                component.style.transform = 'translateX(0)';
            }, index * 100 + 800);
        });
    }
    
    animatePlatformArchitectureSlide(slide) {
        const stackLayers = slide.querySelectorAll('.stack-layer');
        const layers = slide.querySelectorAll('.layer');
        
        stackLayers.forEach((layer, index) => {
            layer.style.opacity = '0';
            layer.style.transform = 'translateX(-40px)';
            setTimeout(() => {
                layer.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                layer.style.opacity = '1';
                layer.style.transform = 'translateX(0)';
            }, index * 150 + 300);
        });
        
        layers.forEach((layer, index) => {
            layer.style.opacity = '0';
            layer.style.transform = 'translateY(20px)';
            setTimeout(() => {
                layer.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                layer.style.opacity = '1';
                layer.style.transform = 'translateY(0)';
            }, index * 100 + 800);
        });
    }
    
    animateLeadershipSlide(slide) {
        const teamMembers = slide.querySelectorAll('.team-member');
        const summaryStats = slide.querySelectorAll('.summary-stat');
        
        teamMembers.forEach((member, index) => {
            member.style.opacity = '0';
            member.style.transform = 'translateY(30px) scale(0.9)';
            setTimeout(() => {
                member.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                member.style.opacity = '1';
                member.style.transform = 'translateY(0) scale(1)';
            }, index * 150 + 300);
        });
        
        summaryStats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'scale(0.8)';
            setTimeout(() => {
                stat.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                stat.style.opacity = '1';
                stat.style.transform = 'scale(1)';
            }, index * 200 + 1000);
        });
    }
    
    animateAdvisorsSlide(slide) {
        const advisorCards = slide.querySelectorAll('.advisor-card');
        
        advisorCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) rotateX(10deg)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0deg)';
            }, index * 150 + 200);
        });
    }
    
    animateGTMSlide(slide) {
        const phaseCards = slide.querySelectorAll('.phase-card');
        
        phaseCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-40px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 200 + 300);
        });
    }
    
    animateResearchSlide(slide) {
        const findingCards = slide.querySelectorAll('.finding-card');
        
        findingCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 150 + 300);
        });
    }
    
    animateFundingSlide(slide) {
        const fundingAmount = slide.querySelector('.funding-amount');
        const marketItems = slide.querySelectorAll('.market-item');
        const ctaSection = slide.querySelector('.call-to-action');
        
        if (fundingAmount) {
            fundingAmount.style.opacity = '0';
            fundingAmount.style.transform = 'scale(0.8) translateY(30px)';
            setTimeout(() => {
                fundingAmount.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                fundingAmount.style.opacity = '1';
                fundingAmount.style.transform = 'scale(1) translateY(0)';
            }, 200);
        }
        
        marketItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100 + 600);
        });
        
        if (ctaSection) {
            ctaSection.style.opacity = '0';
            ctaSection.style.transform = 'translateY(40px) scale(0.95)';
            setTimeout(() => {
                ctaSection.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                ctaSection.style.opacity = '1';
                ctaSection.style.transform = 'translateY(0) scale(1)';
            }, 1000);
        }
    }
    
    animateSlideElements(slide) {
        // Generic animation for slides without specific animations
        const animatableElements = slide.querySelectorAll('p, li, .card, .benefit');
        animatableElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100 + 200);
        });
    }
    
    handleCTAClick() {
        // Simulate scheduling a meeting
        const button = document.querySelector('.cta-button');
        if (!button) return;
        
        const originalText = button.textContent;
        
        button.textContent = 'Connecting...';
        button.disabled = true;
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            button.textContent = 'Meeting Request Sent! ✓';
            button.style.background = 'var(--color-success)';
        }, 1500);
        
        setTimeout(() => {
            button.textContent = 'Schedule Follow-Up Meeting';
            button.style.background = 'var(--color-primary)';
        }, 3000);
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
            button.style.background = '';
        }, 5000);
        
        // Track CTA interaction
        console.log('Investment meeting CTA clicked - would integrate with scheduling system');
    }
    
    // Method to programmatically advance slides (useful for presentations)
    startAutoAdvance(intervalMs = 45000) {
        this.autoAdvanceInterval = setInterval(() => {
            if (this.currentSlideIndex < this.totalSlides - 1) {
                this.nextSlide();
            } else {
                this.stopAutoAdvance();
            }
        }, intervalMs);
    }
    
    stopAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
    }
    
    // Method to get current slide data (useful for analytics)
    getCurrentSlideData() {
        const currentSlide = this.slides[this.currentSlideIndex];
        return {
            slideNumber: this.currentSlideIndex + 1,
            slideElement: currentSlide,
            slideTitle: currentSlide ? currentSlide.querySelector('h1')?.textContent || '' : '',
            timestamp: new Date().toISOString(),
            slideName: this.getSlideNameByIndex(this.currentSlideIndex)
        };
    }
    
    getSlideNameByIndex(index) {
        const slideNames = [
            'Title',
            'Massive Disruption Creates Massive Opportunities',
            'Global Life Span Dramatically Increasing',
            'Driving Aging in Place & Significant Burden',
            'Lost Productivity + Early Resignations',
            'Mission & Vision',
            'Initial Market Opportunity',
            'The Dwel Platform',
            'AI Innovations Transforming Senior Care',
            'Technology Architecture',
            'Platform Architecture Overview',
            'Leadership Team',
            'Board of Advisors',
            'Go-To-Market Plan',
            'Market Research Findings',
            'Funding Ask'
        ];
        return slideNames[index] || `Slide ${index + 1}`;
    }
    
    // Method to jump to specific slide by name or number
    jumpToSlide(target) {
        let targetIndex;
        
        if (typeof target === 'number') {
            targetIndex = target - 1; // Convert to 0-based index
        } else if (typeof target === 'string') {
            const slideNames = [
                'title', 'disruption', 'lifespan', 'aging', 'productivity', 
                'mission', 'market', 'platform', 'ai', 'architecture', 
                'platform-arch', 'leadership', 'advisors', 'gtm', 
                'research', 'funding'
            ];
            targetIndex = slideNames.indexOf(target.toLowerCase());
        }
        
        if (targetIndex >= 0 && targetIndex < this.totalSlides) {
            this.goToSlide(targetIndex);
        }
    }
    
    // Enable presentation mode with helpful features
    enablePresentationMode() {
        document.body.classList.add('presentation-mode');
        
        // Hide cursor after inactivity
        let cursorTimer;
        const hideCursor = () => {
            document.body.style.cursor = 'none';
        };
        const showCursor = () => {
            document.body.style.cursor = '';
            clearTimeout(cursorTimer);
            cursorTimer = setTimeout(hideCursor, 3000);
        };
        
        document.addEventListener('mousemove', showCursor);
        showCursor();
        
        return {
            disable: () => {
                document.body.classList.remove('presentation-mode');
                document.body.style.cursor = '';
                document.removeEventListener('mousemove', showCursor);
                clearTimeout(cursorTimer);
            }
        };
    }
}

// Initialize the pitch deck when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const pitchDeck = new PitchDeck();
    
    // Make it globally accessible for debugging/extensions
    window.pitchDeck = pitchDeck;
    
    // Add some helpful keyboard shortcuts info
    console.log('🎯 Dwel.digital Pitch Deck Controls:');
    console.log('→ Arrow Right / Space: Next slide');
    console.log('← Arrow Left: Previous slide');
    console.log('Home: First slide');
    console.log('End: Last slide');
    console.log('');
    console.log('📊 Access deck controls via: window.pitchDeck');
    console.log('💡 Use pitchDeck.jumpToSlide("platform") to jump to specific slides');
    console.log('🎪 Use pitchDeck.enablePresentationMode() for presentation mode');
    
    // Optional: Track slide views for analytics
    const trackSlideView = (slideData) => {
        // Could send to analytics service
        console.log(`📈 Viewed ${slideData.slideName} (${slideData.slideNumber}/16)`);
        
        // Track key engagement slides
        const keySlides = ['The Dwel Platform', 'Funding Ask', 'AI Innovations Transforming Senior Care'];
        if (keySlides.includes(slideData.slideName)) {
            console.log(`🎯 Key engagement: ${slideData.slideName}`);
        }
    };
    
    // Track initial slide view
    trackSlideView(pitchDeck.getCurrentSlideData());
    
    // Set up slide change tracking
    const originalUpdateSlide = pitchDeck.updateSlide.bind(pitchDeck);
    pitchDeck.updateSlide = function() {
        originalUpdateSlide();
        trackSlideView(this.getCurrentSlideData());
    };
    
    // Add presentation timing helpers
    window.presentationTimer = {
        start: null,
        slideTimers: {},
        
        startPresentation() {
            this.start = Date.now();
            console.log('⏱️ Presentation started');
        },
        
        getElapsedTime() {
            if (!this.start) return 0;
            return Math.round((Date.now() - this.start) / 1000);
        },
        
        logSlideTime(slideNumber) {
            const elapsed = this.getElapsedTime();
            this.slideTimers[slideNumber] = elapsed;
            console.log(`⏰ Slide ${slideNumber}: ${elapsed}s total`);
        }
    };
});

// Add some utility functions for presentation mode
window.addEventListener('load', () => {
    // Add fullscreen capability
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F11' || (e.key === 'f' && e.ctrlKey)) {
            e.preventDefault();
            toggleFullscreen();
        }
        
        // Presenter shortcuts
        if (e.key === 'p' && e.ctrlKey) {
            e.preventDefault();
            if (window.pitchDeck) {
                window.pitchDeck.enablePresentationMode();
            }
        }
    });
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PitchDeck;
}