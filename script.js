document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            mobileMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });

    // Counter Animation
    function animateCounters() {
        const businessCount = document.getElementById('businessCount');
        const cityCount = document.getElementById('cityCount');
        const categoryCount = document.getElementById('categoryCount');
        
        const targetBusiness = 1243;
        const targetCity = 28;
        const targetCategory = 12;
        
        let currentBusiness = 0;
        let currentCity = 0;
        let currentCategory = 0;
        
        const businessInterval = setInterval(() => {
            currentBusiness += 10;
            if (currentBusiness >= targetBusiness) {
                currentBusiness = targetBusiness;
                clearInterval(businessInterval);
            }
            businessCount.textContent = currentBusiness.toLocaleString();
        }, 10);
        
        const cityInterval = setInterval(() => {
            currentCity += 1;
            if (currentCity >= targetCity) {
                currentCity = targetCity;
                clearInterval(cityInterval);
            }
            cityCount.textContent = currentCity;
        }, 50);
        
        const categoryInterval = setInterval(() => {
            currentCategory += 1;
            if (currentCategory >= targetCategory) {
                currentCategory = targetCategory;
                clearInterval(categoryInterval);
            }
            categoryCount.textContent = currentCategory;
        }, 100);
    }
    
    // Run counter animation when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.hero'));

    // Modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileRegisterBtn = document.getElementById('mobileRegisterBtn');
    const ctaRegisterBtn = document.getElementById('ctaRegisterBtn');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const forgotPassword = document.querySelector('.forgot-password');
    const switchBackToLogin = document.getElementById('switchBackToLogin');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });
    
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerModal);
    });
    
    mobileLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });
    
    mobileRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerModal);
    });
    
    ctaRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(registerModal);
    });
    
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(forgotPasswordModal);
    });
    
    switchBackToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(forgotPasswordModal);
        openModal(loginModal);
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login functionality will be implemented');
        closeModal(loginModal);
    });
    
    // 1. Enhanced Registration Flow
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const businessData = {
            id: businesses.length + 1,
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            phone: document.getElementById('registerPhone').value,
            category: document.getElementById('registerCategory').value,
            location: document.getElementById('registerLocation').value,
            description: `New ${document.getElementById('registerCategory').value} business`,
            rating: 0,
            reviews: [],
            dateAdded: new Date().toISOString().split('T')[0],
            image: `https://source.unsplash.com/random/600x400/?${document.getElementById('registerCategory').value}`
        };

        // Add to businesses array
        businesses.unshift(businessData);
        
        // Show success message
        alert('Registration successful! Your business is now live.');
        closeModal(registerModal);
        
        // Refresh listings
        renderBusinesses();
        
        // Reset form
        this.reset();
    });
    
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Password reset link has been sent to your email');
        closeModal(forgotPasswordModal);
    });

    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Business directory filtering
    const locationFilter = document.getElementById('location-filter');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const businessGrid = document.getElementById('businessGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Sample business data with reviews
    const businesses = [
        {
            id: 1,
            name: "Kota Khona",
            category: "food",
            location: "embalenhle",
            description: "Freshly made kotas and meals with traditional recipes passed down for generations.",
            rating: 4.8,
            reviews: [
                { user: "Sphiwe M.", rating: 5, comment: "Best food in town!" },
                { user: "Thabo D.", rating: 4, comment: "Great service and delicious meals" },
                { user: "Lerato S.", rating: 2, comment: "Great service and delicious meals, but was cold." },
            ],
            dateAdded: "2025-03-15",
            image: "images/kota.jpg",
            premium: true
        },
        {
            id: 2,
            name: "Killer's Barbershop",
            category: "beauty",
            location: "capetown",
            description: "Professional haircuts and grooming services for men and women in a friendly atmosphere.",
            rating: 4.5,
            reviews: [
                { user: "Lerato P.", rating: 5, comment: "Always leave looking fresh!" }
            ],
            dateAdded: "2025-03-12",
            image: "images/barber.jpg",
            premium: false
        },
        {
            id: 3,
            name: "Ayanda's Bakery",
            category: "food",
            location: "embalenhle",
            description: "Freshly baked goodies. Parties, weddings, funerals, we bake all kinds of creamy goodies.",
            reviews: [
                { user: "Njabulo M.", rating: 2, comment: "Fumbled the cake design I sent, but the cake was edible." },
                { user: "Caphius M.", rating: 4, comment: "Best baker ever!" },
                { user: "Sibusiso N.", rating: 5, comment: "Birthday cake turned out as expected, delicious." },
                { user: "Mbali Z.", rating: 3, comment: "Could've used more creativity on the design, but I loved the cake." },
                { user: "Jane O.", rating: 5, comment: "Made my wedding special, Ayanda is the best. 10 out of 5" },
            ],
            dateAdded: "2025-05-22",
            image: "images/cake.jpg",
            premium: false
        },
        {
            id: 4,
            name: "This Geek",
            category: "tech",
            location: "secunda",
            description: "IT company that specializes on repairs, cybersecurity, networking and more.",
            reviews: [
                { user: "Sibonelo S.", rating: 3, comment: "Professional young man." },
                { user: "John H.", rating: 4, comment: "Tries to fully understand your problem before attempting anything, that's professionalism to me." },
                { user: "Gert Van W.", rating: 5, comment: "Het my werkskootrekenaar reggemaak, dalk huur ek hom as my permanente IT-man vir my maatskappy. Grootheid." },
                { user: "Mxholisi N.", rating: 4, comment: "Found my lost phone and the person who stole it. Izinja zeGame." },
                { user: "Sipho M.", rating: 5, comment: "Networking specialist." },
            ],
            dateAdded: "2025-01-01",
            image: "images/comp.jpg",
            premium: true
        },
    ];
    
    function calculateAverageRating(reviews) {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
    }

    // Example usage:
    businesses.forEach(biz => {
    biz.rating = calculateAverageRating(biz.reviews);
    });

    
    let displayedBusinesses = 6;
    
    function renderBusinesses(filteredBusinesses = businesses) {
        // Clear the grid
        businessGrid.innerHTML = '';
        
        // Display businesses (up to displayedBusinesses count)
        const businessesToShow = filteredBusinesses.slice(0, displayedBusinesses);
        
        if (businessesToShow.length === 0) {
            businessGrid.innerHTML = '<p class="no-results">No businesses found matching your criteria.</p>';
            loadMoreBtn.style.display = 'none';
        } else {
            businessesToShow.forEach(business => {
                const categoryNames = {
                    food: "Food & Restaurants",
                    beauty: "Beauty & Grooming",
                    repairs: "Repairs & Maintenance",
                    art: "Art & Crafts",
                    transport: "Transport",
                    tech: "Tech Services"
                };
                
                const locationNames = {
                    johannesburg: "Johannesburg",
                    capetown: "Cape Town",
                    durban: "Durban",
                    pretoria: "Pretoria",
                    portelizabeth: "Port Elizabeth",
                    embalenhle: "Embalenhle, Mpumalanga",
                    secunda: "Secunda, Mpumalanga",
                    standerton: "Standerton, Mpumalanga",
                };
                
                const businessCard = document.createElement('div');
                businessCard.className = `business-card ${business.premium ? 'premium-card' : ''}`;
                businessCard.dataset.id = business.id;
                businessCard.innerHTML = `
                    ${business.premium ? '<div class="premium-badge">PREMIUM</div>' : ''}
                    <div class="business-image">
                        <img src="${business.image}" alt="${business.name}">
                        <div class="business-category">${categoryNames[business.category]}</div>
                    </div>
                    <div class="business-content">
                        <h3 class="business-title">${business.name}</h3>
                        <div class="business-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${locationNames[business.location]}</span>
                        </div>
                        <p class="business-description">${business.description}</p>
                        <div class="business-footer">
                            <div class="business-rating">
                                <i class="fas fa-star"></i>
                                <span>${business.rating}</span>
                                <small>(${business.reviews.length} reviews)</small>
                            </div>
                            <div class="business-actions">
                                <button title="Save"><i class="far fa-bookmark"></i></button>
                                <button title="Contact"><i class="far fa-envelope"></i></button>
                                <button title="View" class="view-details"><i class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                `;
                
                businessGrid.appendChild(businessCard);
            });
            
            // Initialize review system for these businesses
            initReviewSystem();
            
            // Show/hide load more button
            if (filteredBusinesses.length > displayedBusinesses) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }
    
    // 2. Enhanced Search Functionality
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-btn');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    function performSearch() {
        const term = searchInput.value.toLowerCase();
        if (!term) {
            renderBusinesses();
            return;
        }
        
        const results = businesses.filter(business => 
            business.name.toLowerCase().includes(term) || 
            business.description.toLowerCase().includes(term) ||
            business.category.toLowerCase().includes(term)
        );
        
        renderBusinesses(results);
        
        // Add highlighting (optional)
        if (results.length > 0) {
            document.querySelectorAll('.business-title').forEach(title => {
                if (title.textContent.toLowerCase().includes(term)) {
                    title.innerHTML = title.textContent.replace(
                        new RegExp(term, 'gi'), 
                        match => `<span class="search-highlight">${match}</span>`
                    );
                }
            });
        }
    }
    
    // 3. Review System
    function initReviewSystem() {
        document.querySelectorAll('.business-actions .view-details').forEach(btn => {
            btn.addEventListener('click', function() {
                const businessId = parseInt(this.closest('.business-card').dataset.id);
                showBusinessDetails(businessId);
            });
        });
    }
    
    function showBusinessDetails(id) {
        const business = businesses.find(b => b.id === id);
        const modal = document.createElement('div');
        modal.className = 'business-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="business-header">
                    <img src="${business.image}" alt="${business.name}">
                    <div>
                        <h2>${business.name}</h2>
                        <div class="business-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${business.location}</span>
                            <span><i class="fas fa-star"></i> ${business.rating} (${business.reviews.length} reviews)</span>
                        </div>
                    </div>
                </div>
                <div class="business-description">
                    <h3>About</h3>
                    <p>${business.description}</p>
                </div>
                <div class="business-reviews">
                    <h3>Reviews</h3>
                    ${business.reviews.length > 0 ? 
                        business.reviews.map(review => `
                            <div class="review">
                                <div class="review-header">
                                    <strong>${review.user}</strong>
                                    <div class="review-rating">
                                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                                    </div>
                                </div>
                                <p>${review.comment}</p>
                            </div>
                        `).join('') : 
                        '<p>No reviews yet. Be the first to review!</p>'
                    }
                </div>
                <form class="add-review">
                    <h3>Add Your Review</h3>
                    <div class="rating-input">
                        <span>Rating:</span>
                        <div class="stars">
                            ${[1,2,3,4,5].map(i => `<span class="star" data-value="${i}">☆</span>`).join('')}
                        </div>
                        <input type="hidden" name="rating" id="rating-value" value="0">
                    </div>
                    <textarea placeholder="Share your experience..." required></textarea>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Star rating interaction
        modal.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                modal.querySelector('#rating-value').value = value;
                
                // Update star display
                modal.querySelectorAll('.star').forEach((s, i) => {
                    s.textContent = i < value ? '★' : '☆';
                });
            });
        });
        
        // Form submission
        modal.querySelector('.add-review').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rating = parseInt(modal.querySelector('#rating-value').value);
            const comment = this.querySelector('textarea').value;
            
            if (rating === 0) {
                alert('Please select a rating');
                return;
            }
            
            // Add review to business
            business.reviews.push({
                user: "You",
                rating: rating,
                comment: comment
            });
            
            // Update average rating
            const total = business.reviews.reduce((sum, review) => sum + review.rating, 0);
            business.rating = (total / business.reviews.length).toFixed(1);
            
            // Close modal and refresh
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
            renderBusinesses();
        });
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });
    }
    
    // Initial render
    renderBusinesses();
    
    // Filter event listeners
    locationFilter.addEventListener('change', () => renderBusinesses(filterBusinesses()));
    categoryFilter.addEventListener('change', () => renderBusinesses(filterBusinesses()));
    sortBy.addEventListener('change', () => renderBusinesses(filterBusinesses()));
    
    function filterBusinesses() {
        const locationValue = locationFilter.value;
        const categoryValue = categoryFilter.value;
        const sortValue = sortBy.value;
        
        // Filter businesses
        let filteredBusinesses = businesses.filter(business => {
            return (locationValue === 'all' || business.location === locationValue) && 
                   (categoryValue === 'all' || business.category === categoryValue);
        });
        
        // Sort businesses
        if (sortValue === 'rating') {
            filteredBusinesses.sort((a, b) => b.rating - a.rating);
        } else if (sortValue === 'newest') {
            filteredBusinesses.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        } else if (sortValue === 'popular') {
            filteredBusinesses.sort((a, b) => b.reviews.length - a.reviews.length);
        }
        
        return filteredBusinesses;
    }
    
    // Load more businesses
    loadMoreBtn.addEventListener('click', function() {
        displayedBusinesses += 6;
        renderBusinesses(filterBusinesses());
        
        // Scroll to the newly loaded businesses
        setTimeout(() => {
            const cards = document.querySelectorAll('.business-card');
            if (cards.length > 6) {
                cards[cards.length - 6].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    });

    // Google Maps Integration
    function initMap() {
        // Default location (Johannesburg)
        const defaultLocation = { lat: -26.2041, lng: 28.0473 };
        
        // Create map
        const map = new google.maps.Map(document.getElementById('businessMap'), {
            zoom: 12,
            center: defaultLocation,
            styles: [
                // Your existing map styles...
            ]
        });
        
        // Add markers for businesses
        businesses.forEach(business => {
            // For demo, we'll just scatter them around the default location
            const lat = defaultLocation.lat + (Math.random() * 0.1 - 0.05);
            const lng = defaultLocation.lng + (Math.random() * 0.1 - 0.05);
            
            new google.maps.Marker({
                position: { lat, lng },
                map,
                title: business.name,
                icon: {
                    url: `https://maps.google.com/mapfiles/ms/icons/${getColorForCategory(business.category)}-dot.png`
                }
            });
        });
        
        // Locate me button
        document.getElementById('locateMeBtn').addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        
                        map.setCenter(userLocation);
                        map.setZoom(14);
                        
                        // Add user marker
                        new google.maps.Marker({
                            position: userLocation,
                            map,
                            title: "Your Location",
                            icon: {
                                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            }
                        });
                    },
                    () => {
                        alert("Unable to get your location. Using default location instead.");
                        map.setCenter(defaultLocation);
                    }
                );
            } else {
                alert("Geolocation is not supported by your browser.");
                map.setCenter(defaultLocation);
            }
        });
    }
    
    function getColorForCategory(category) {
        const colors = {
            food: "red",
            beauty: "pink",
            repairs: "green",
            art: "purple",
            transport: "yellow",
            tech: "blue"
        };
        
        return colors[category] || "orange";
    }
    
    // Initialize map when window loads
    window.initMap = initMap;
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .feature-card, .business-card, .testimonial-card, .about-image, .about-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.category-card, .feature-card, .business-card, .testimonial-card, .about-image, .about-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize map when the map section comes into view
    const mapObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (typeof google !== 'undefined') {
                initMap();
            }
            mapObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.1 });
    
    mapObserver.observe(document.querySelector('.map-section'));
});