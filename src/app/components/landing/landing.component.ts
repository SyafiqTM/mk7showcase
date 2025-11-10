import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  standalone: false
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild('golfVideo') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('stackCard1') stackCard1!: ElementRef<HTMLDivElement>;
  @ViewChild('stackCard2') stackCard2!: ElementRef<HTMLDivElement>;
  @ViewChild('stackCard3') stackCard3!: ElementRef<HTMLDivElement>;

  carImages = [
    'assets/golfr_1.jpg',
    'assets/golfr_3.jpg',
    'assets/golfr_3.jpg'
  ];

  isVideoPlaying = false;

  ngOnInit() {
    // Ensure page loads at top
    window.scrollTo(0, 0);
    console.log("Landing component initialized");
    
    // Initial card animation setup
    this.animateCards();
  }

  ngOnDestroy() {
    // Clean up any listeners if needed
  }

  // Scroll to top functionality
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Video play functionality
  playVideo(): void {
    if (this.videoElement?.nativeElement) {
      this.isVideoPlaying = true;
      this.videoElement.nativeElement.play();
      this.videoElement.nativeElement.setAttribute('controls', 'controls');
    }
  }

  // Video ended event handler
  onVideoEnded(): void {
    this.isVideoPlaying = false;
    if (this.videoElement?.nativeElement) {
      this.videoElement.nativeElement.removeAttribute('controls');
    }
  }

  // Video pause event handler
  onVideoPause(): void {
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      if (video.currentTime < video.duration) {
        this.isVideoPlaying = false;
        video.removeAttribute('controls');
      }
    }
  }

  // Listen for scroll events
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.animateCards();
  }

  // Card animation functionality
  private animateCards(): void {
    const cards = [this.stackCard1, this.stackCard2, this.stackCard3];
    const heroSection = document.querySelector('.hero-title') as HTMLElement;
    
    if (!heroSection) return;

    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight - 50;

    // Animation starts after the hero section ends
    if (scrollY < heroHeight) {
      cards.forEach((cardRef, index) => {
        if (cardRef?.nativeElement) {
          const initialRotations = [-20, 38, -42];
          const card = cardRef.nativeElement;
          card.style.transform = `rotate(${initialRotations[index]}deg) translateY(100px)`;
        }
      });
      return;
    }

    cards.forEach((cardRef, index) => {
      if (cardRef?.nativeElement) {
        const card = cardRef.nativeElement;
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress for this card (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));

        // Get initial rotation based on card index
        const initialRotations = [-20, 38, -42];
        const initialRotation = initialRotations[index];

        // Calculate current rotation based on scroll progress
        const currentRotation = initialRotation * (1 - scrollProgress);

        // Calculate vertical translation (cards move up as they come into view)
        const translateY = 100 * (1 - scrollProgress);

        // Apply both rotation and translation
        card.style.transform = `rotate(${currentRotation}deg) translateY(${translateY}px)`;
      }
    });
  }
}
