import React, { useEffect, useState, useMemo } from 'react';
import { CharacterConfig, Emotion } from '../../types/character';

interface CharacterSvgProps {
  config: CharacterConfig;
  emotion?: Emotion;
  isSpeaking?: boolean;
  isWaving?: boolean;
  isJumping?: boolean;
  enableMouseTracking?: boolean;
  className?: string;
  onClick?: () => void;
  onPetPart?: (part: 'head' | 'cheeks' | 'tummy' | 'hands') => void;
}

export const CharacterSvg: React.FC<CharacterSvgProps> = ({
  config,
  emotion = 'normal',
  isSpeaking = false,
  isWaving = false,
  isJumping = false,
  enableMouseTracking = true,
  className = '',
  onClick,
  onPetPart,
}) => {
  // Blinking timer
  const [isBlinking, setIsBlinking] = useState(false);
  // Speaking mouth toggle state
  const [mouthFrame, setMouthFrame] = useState(0);
  // Pupil offset from mouse tracking
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  // Random natural eye blink interval
  useEffect(() => {
    let blinkTimeout: number;
    let unblinkTimeout: number;

    const scheduleNextBlink = () => {
      const delay = Math.random() * 3200 + 2400; // blink every 2.4 - 5.6s
      blinkTimeout = window.setTimeout(() => {
        setIsBlinking(true);
        unblinkTimeout = window.setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 130);
      }, delay);
    };

    scheduleNextBlink();
    return () => {
      window.clearTimeout(blinkTimeout);
      window.clearTimeout(unblinkTimeout);
    };
  }, []);

  // Animate mouth when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthFrame(0);
      return;
    }
    const interval = window.setInterval(() => {
      setMouthFrame((prev) => (prev === 0 ? 1 : 0));
    }, 150);
    return () => window.clearInterval(interval);
  }, [isSpeaking]);

  // Eye tracking: pupils follow mouse cursor
  useEffect(() => {
    if (!enableMouseTracking) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);
      // Clamp to max 4px
      setPupilOffset({
        x: Math.max(-4, Math.min(4, dx * 4)),
        y: Math.max(-3, Math.min(3, dy * 3)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableMouseTracking]);

  const effectiveEmotion = emotion || config.emotion || 'normal';

  // Hair style helpers
  const { hair, outfit, headwear, accessory, shoes, skinTone, eyes, eyebrows, blush, freckles, gender } = config;

  return (
    <div
      className={`relative select-none inline-block ${className} ${
        isJumping ? 'animate-bounce' : ''
      }`}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 400 500"
        className="w-full h-auto drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft Drop Shadow Filter */}
          <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
          </filter>

          {/* Hair Gradient */}
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hair.color} />
            <stop offset="60%" stopColor={hair.color} />
            <stop offset="100%" stopColor={hair.highlightColor || hair.color} />
          </linearGradient>

          {/* Eye Gradient */}
          <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="45%" stopColor={eyes.color} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </linearGradient>

          {/* Uzbek Atlas Silk Dress Gradient */}
          <linearGradient id="uzbekAtlasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={outfit.primaryColor || '#e11d48'} />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="75%" stopColor="#059669" />
            <stop offset="100%" stopColor={outfit.primaryColor || '#e11d48'} />
          </linearGradient>

          {/* Celestial Yuimi Shimmer Gradient */}
          <linearGradient id="yuimiShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={outfit.primaryColor || '#8b5cf6'} />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor={outfit.secondaryColor || '#fdf4ff'} />
          </linearGradient>
        </defs>

        {/* ── 1. GROUND SHADOW ── */}
        <ellipse cx="200" cy="475" rx="75" ry="14" fill="#000000" opacity="0.18" />

        {/* ── 2. BACK ACCESSORIES (WINGS / TAILS) ── */}
        {accessory === 'angel_wings' && (
          <g opacity="0.95">
            {/* Left Wing */}
            <path
              d="M 140 250 C 90 200, 40 180, 20 230 C 10 260, 40 290, 80 300 C 60 310, 80 340, 110 330 C 130 320, 140 280, 140 250 Z"
              fill={config.accessoryColor || '#f8fafc'}
              stroke="#cbd5e1"
              strokeWidth="2.5"
            />
            {/* Right Wing */}
            <path
              d="M 260 250 C 310 200, 360 180, 380 230 C 390 260, 360 290, 320 300 C 340 310, 320 340, 290 330 C 270 320, 260 280, 260 250 Z"
              fill={config.accessoryColor || '#f8fafc'}
              stroke="#cbd5e1"
              strokeWidth="2.5"
            />
          </g>
        )}

        {accessory === 'demon_wings' && (
          <g>
            <path
              d="M 140 260 L 60 200 L 90 250 L 50 280 L 100 290 L 80 320 L 140 280 Z"
              fill="#27272a"
              stroke="#dc2626"
              strokeWidth="2"
            />
            <path
              d="M 260 260 L 340 200 L 310 250 L 350 280 L 300 290 L 320 320 L 260 280 Z"
              fill="#27272a"
              stroke="#dc2626"
              strokeWidth="2"
            />
          </g>
        )}

        {accessory === 'cat_tail' && (
          <path
            d="M 230 380 C 270 390, 310 380, 320 340 C 325 320, 310 300, 295 310 C 285 320, 295 340, 280 355 C 265 370, 240 375, 230 380 Z"
            fill={config.accessoryColor || hair.color}
            stroke="#18181b"
            strokeWidth="2"
            className="animate-pulse origin-bottom-left"
          />
        )}

        {/* ── 3. BACK HAIR ── */}
        {hair.style === 'long_flowing' && (
          <path
            d="M 125 150 C 100 210, 95 310, 110 380 C 130 375, 145 350, 150 310 L 250 310 C 255 350, 270 375, 290 380 C 305 310, 300 210, 275 150 Z"
            fill="url(#hairGrad)"
            stroke="#18181b"
            strokeWidth="2"
          />
        )}
        {hair.style === 'twin_tails' && (
          <g>
            {/* Left tail */}
            <path
              d="M 130 145 C 90 160, 60 220, 75 320 C 85 340, 110 320, 105 280 C 100 240, 115 190, 135 170 Z"
              fill="url(#hairGrad)"
              stroke="#18181b"
              strokeWidth="2"
            />
            {/* Right tail */}
            <path
              d="M 270 145 C 310 160, 340 220, 325 320 C 315 340, 290 320, 295 280 C 300 240, 285 190, 265 170 Z"
              fill="url(#hairGrad)"
              stroke="#18181b"
              strokeWidth="2"
            />
          </g>
        )}
        {hair.style === 'braids' && (
          <g>
            {/* Left braid */}
            <path
              d="M 130 160 C 110 200, 100 280, 115 360 C 122 365, 130 355, 126 330 C 122 280, 130 220, 140 180 Z"
              fill="url(#hairGrad)"
              stroke="#18181b"
              strokeWidth="2"
            />
            {/* Right braid */}
            <path
              d="M 270 160 C 290 200, 300 280, 285 360 C 278 365, 270 355, 274 330 C 278 280, 270 220, 260 180 Z"
              fill="url(#hairGrad)"
              stroke="#18181b"
              strokeWidth="2"
            />
          </g>
        )}
        {hair.style === 'curly_wave' && (
          <path
            d="M 125 150 C 90 220, 85 320, 120 370 C 140 340, 135 290, 150 250 L 250 250 C 265 290, 260 340, 280 370 C 315 320, 310 220, 275 150 Z"
            fill="url(#hairGrad)"
            stroke="#18181b"
            strokeWidth="2"
          />
        )}
        {hair.style === 'hime_cut' && (
          <path
            d="M 125 150 L 105 390 L 145 390 L 150 280 L 250 280 L 255 390 L 295 390 L 275 150 Z"
            fill="url(#hairGrad)"
            stroke="#18181b"
            strokeWidth="2"
          />
        )}

        {/* ── 4. LEGS & SHOES ── */}
        <g id="legs-and-shoes">
          {/* Left Leg */}
          <rect
            x="170"
            y="350"
            width="22"
            height="85"
            rx="10"
            fill={gender === 'girl' ? skinTone : skinTone}
            stroke="#18181b"
            strokeWidth="2"
          />
          {/* Right Leg */}
          <rect
            x="208"
            y="350"
            width="22"
            height="85"
            rx="10"
            fill={gender === 'girl' ? skinTone : skinTone}
            stroke="#18181b"
            strokeWidth="2"
          />

          {/* Socks for Girl or School Outfit */}
          {(outfit.id === 'school_girl' || outfit.id === 'yuimi_celestial') && (
            <>
              {/* Thigh-high socks */}
              <rect x="170" y="370" width="22" height="55" rx="4" fill={outfit.secondaryColor || '#ffffff'} />
              <rect x="208" y="370" width="22" height="55" rx="4" fill={outfit.secondaryColor || '#ffffff'} />
              {/* Striped lace band */}
              <rect x="170" y="370" width="22" height="4" fill={outfit.accentColor || '#f59e0b'} />
              <rect x="208" y="370" width="22" height="4" fill={outfit.accentColor || '#f59e0b'} />
            </>
          )}

          {/* Shoes Rendering */}
          {shoes.id === 'sneakers' && (
            <g>
              <ellipse cx="180" cy="435" rx="15" ry="10" fill={shoes.color || '#f8fafc'} stroke="#18181b" strokeWidth="2" />
              <ellipse cx="220" cy="435" rx="15" ry="10" fill={shoes.color || '#f8fafc'} stroke="#18181b" strokeWidth="2" />
              {/* Laces */}
              <line x1="175" y1="432" x2="185" y2="432" stroke="#3b82f6" strokeWidth="2" />
              <line x1="215" y1="432" x2="225" y2="432" stroke="#3b82f6" strokeWidth="2" />
            </g>
          )}

          {shoes.id === 'boots' && (
            <g>
              <rect x="168" y="405" width="26" height="35" rx="6" fill={shoes.color || '#1e3a8a'} stroke="#18181b" strokeWidth="2" />
              <rect x="206" y="405" width="26" height="35" rx="6" fill={shoes.color || '#1e3a8a'} stroke="#18181b" strokeWidth="2" />
              {/* Golden Buckle */}
              <rect x="176" y="418" width="10" height="6" rx="1" fill="#f59e0b" />
              <rect x="214" y="418" width="10" height="6" rx="1" fill="#f59e0b" />
            </g>
          )}

          {shoes.id === 'mary_janes' && (
            <g>
              <ellipse cx="180" cy="435" rx="14" ry="9" fill={shoes.color || '#09090b'} stroke="#18181b" strokeWidth="2" />
              <ellipse cx="220" cy="435" rx="14" ry="9" fill={shoes.color || '#09090b'} stroke="#18181b" strokeWidth="2" />
              <line x1="172" y1="431" x2="188" y2="431" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="212" y1="431" x2="228" y2="431" stroke="#cbd5e1" strokeWidth="2" />
            </g>
          )}

          {shoes.id === 'traditional_ichig' && (
            <g>
              {/* Uzbek Traditional Mahsi (soft leather boots) with gold trim */}
              <path d="M 168 395 L 194 395 L 196 440 L 168 440 Z" fill={shoes.color || '#7f1d1d'} stroke="#18181b" strokeWidth="2" />
              <path d="M 206 395 L 232 395 L 232 440 L 204 440 Z" fill={shoes.color || '#7f1d1d'} stroke="#18181b" strokeWidth="2" />
              {/* Curved tip */}
              <ellipse cx="178" cy="438" rx="13" ry="7" fill={shoes.color || '#7f1d1d'} />
              <ellipse cx="222" cy="438" rx="13" ry="7" fill={shoes.color || '#7f1d1d'} />
              {/* Gold floral edge */}
              <line x1="168" y1="400" x2="194" y2="400" stroke="#f59e0b" strokeWidth="3" />
              <line x1="206" y1="400" x2="232" y2="400" stroke="#f59e0b" strokeWidth="3" />
            </g>
          )}

          {shoes.id === 'ninja_tabi' && (
            <g>
              <rect x="168" y="410" width="26" height="30" rx="4" fill="#09090b" stroke="#18181b" strokeWidth="2" />
              <rect x="206" y="410" width="26" height="30" rx="4" fill="#09090b" stroke="#18181b" strokeWidth="2" />
              {/* Split toe mark */}
              <line x1="177" y1="435" x2="177" y2="442" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="215" y1="435" x2="215" y2="442" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          )}

          {shoes.id === 'sandals' && (
            <g>
              <ellipse cx="180" cy="438" rx="14" ry="7" fill="#78350f" stroke="#18181b" strokeWidth="2" />
              <ellipse cx="220" cy="438" rx="14" ry="7" fill="#78350f" stroke="#18181b" strokeWidth="2" />
              <line x1="170" y1="435" x2="190" y2="435" stroke="#dc2626" strokeWidth="2" />
              <line x1="210" y1="435" x2="230" y2="435" stroke="#dc2626" strokeWidth="2" />
            </g>
          )}

          {shoes.id === 'slippers' && (
            <g>
              <ellipse cx="180" cy="435" rx="16" ry="10" fill={shoes.color || '#f472b6'} stroke="#18181b" strokeWidth="2" />
              <ellipse cx="220" cy="435" rx="16" ry="10" fill={shoes.color || '#f472b6'} stroke="#18181b" strokeWidth="2" />
              <circle cx="180" cy="430" r="4" fill="#ffffff" />
              <circle cx="220" cy="430" r="4" fill="#ffffff" />
            </g>
          )}
        </g>

        {/* ── 5. BODY TORSO & ARMS BASE ── */}
        <g id="torso-and-arms">
          {/* Left Arm */}
          <path
            d="M 150 250 C 130 270, 130 310, 145 340"
            stroke={skinTone}
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Arm: Waving if isWaving or resting */}
          {isWaving ? (
            <path
              d="M 250 250 C 275 220, 285 180, 280 150"
              stroke={skinTone}
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
              className="animate-pulse origin-bottom"
            />
          ) : (
            <path
              d="M 250 250 C 270 270, 270 310, 255 340"
              stroke={skinTone}
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Neck */}
          <rect x="190" y="225" width="20" height="24" rx="6" fill={skinTone} stroke="#18181b" strokeWidth="2" />
        </g>

        {/* ── 6. OUTFIT / CLOTHES (DETAILED MULTI-THEME VECTOR DESIGNS) ── */}
        <g id="character-outfit">
          {/* 🌟 YUIMI CELESTIAL ACADEMY OUTFIT ("yuimining kiyiminig dizayniga ahamiyat ber") 🌟 */}
          {outfit.id === 'yuimi_celestial' && (
            <g id="yuimi-celestial-design">
              {/* Pleated Starlight Skirt / Trousers */}
              <path
                d="M 155 315 L 245 315 L 260 375 L 140 375 Z"
                fill={outfit.primaryColor || '#8b5cf6'}
                stroke="#18181b"
                strokeWidth="2"
              />
              {/* Golden Hem Embroidery on Skirt */}
              <path
                d="M 140 370 Q 200 378 260 370"
                stroke={outfit.accentColor || '#f59e0b'}
                strokeWidth="4"
                fill="none"
              />
              {/* Pleats vertical lines */}
              <line x1="170" y1="315" x2="165" y2="372" stroke="#6d28d9" strokeWidth="1.5" />
              <line x1="190" y1="315" x2="190" y2="375" stroke="#6d28d9" strokeWidth="1.5" />
              <line x1="210" y1="315" x2="210" y2="375" stroke="#6d28d9" strokeWidth="1.5" />
              <line x1="230" y1="315" x2="235" y2="372" stroke="#6d28d9" strokeWidth="1.5" />

              {/* Magical Academy Vest / Blouse */}
              <path
                d="M 160 240 L 240 240 L 245 320 L 155 320 Z"
                fill={outfit.secondaryColor || '#fdf4ff'}
                stroke="#18181b"
                strokeWidth="2"
              />

              {/* Celestial Bolero / Capelet */}
              <path
                d="M 150 240 C 150 240, 165 295, 200 290 C 235 295, 250 240, 250 240 L 255 255 C 255 285, 230 300, 200 300 C 170 300, 145 285, 145 255 Z"
                fill="url(#yuimiShimmer)"
                stroke="#18181b"
                strokeWidth="2"
              />

              {/* Sleeves */}
              <path d="M 160 240 L 138 290 L 155 295 L 170 255 Z" fill={outfit.primaryColor} stroke="#18181b" strokeWidth="2" />
              <path d="M 240 240 L 262 290 L 245 295 L 230 255 Z" fill={outfit.primaryColor} stroke="#18181b" strokeWidth="2" />
              {/* White lace ruffles at cuffs */}
              <ellipse cx="146" cy="292" rx="10" ry="4" fill="#ffffff" />
              <ellipse cx="254" cy="292" rx="10" ry="4" fill="#ffffff" />

              {/* Golden Celestial Star Brooch / Amulet */}
              <g transform="translate(200, 265)">
                {/* 8-pointed star */}
                <polygon
                  points="0,-12 3,-4 11,-4 5,2 7,10 0,5 -7,10 -5,2 -11,-4 -3,-4"
                  fill="#f59e0b"
                  stroke="#b45309"
                  strokeWidth="1.2"
                />
                {/* Glowing Dream Crystal in center */}
                <circle cx="0" cy="1" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
              </g>

              {/* Sailor Collar with Golden Trim */}
              <path
                d="M 180 238 L 200 258 L 220 238 L 200 232 Z"
                fill="#ffffff"
                stroke={outfit.accentColor || '#f59e0b'}
                strokeWidth="2"
              />
            </g>
          )}

          {/* 🇺🇿 UZBEK TRADITIONAL ATLAS SILK DRESS (Shirin) */}
          {outfit.id === 'uzbek_atlas' && (
            <g id="uzbek-atlas-design">
              {/* Long Flared Silk Dress */}
              <path
                d="M 160 240 L 240 240 L 265 400 L 135 400 Z"
                fill="url(#uzbekAtlasGrad)"
                stroke="#18181b"
                strokeWidth="2"
              />
              {/* Traditional Chevron / Cloud Atlas Flame Patterns */}
              <path
                d="M 150 290 Q 170 275 190 290 Q 210 275 230 290 Q 250 275 255 290"
                stroke="#fef08a"
                strokeWidth="3.5"
                fill="none"
              />
              <path
                d="M 145 330 Q 170 315 195 330 Q 220 315 245 330 Q 255 315 260 330"
                stroke="#ffffff"
                strokeWidth="3.5"
                fill="none"
              />
              <path
                d="M 140 370 Q 170 355 200 370 Q 230 355 260 370"
                stroke="#38bdf8"
                strokeWidth="3.5"
                fill="none"
              />
              {/* Billowing Sleeves */}
              <path d="M 160 240 L 130 320 L 155 325 L 170 255 Z" fill="url(#uzbekAtlasGrad)" stroke="#18181b" strokeWidth="2" />
              <path d="M 240 240 L 270 320 L 245 325 L 230 255 Z" fill="url(#uzbekAtlasGrad)" stroke="#18181b" strokeWidth="2" />
              {/* Golden Zardozi Collar Accent */}
              <path d="M 185 236 L 200 262 L 215 236 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
            </g>
          )}

          {/* 🇺🇿 UZBEK TRADITIONAL CHAPAN WITH ZARDOZI EMBROIDERY (Farxod) */}
          {outfit.id === 'uzbek_chapan' && (
            <g id="uzbek-chapan-design">
              {/* Long Royal Chapan Robe */}
              <path
                d="M 155 240 L 245 240 L 260 410 L 140 410 Z"
                fill={outfit.primaryColor || '#1e3a8a'}
                stroke="#18181b"
                strokeWidth="2"
              />
              {/* Inner white under-shirt */}
              <path d="M 185 235 L 200 275 L 215 235 Z" fill="#ffffff" />
              {/* Wide Golden Zardozi Embroidery Edges */}
              <path d="M 195 240 L 195 410" stroke="#f59e0b" strokeWidth="6" />
              <path d="M 205 240 L 205 410" stroke="#fbbf24" strokeWidth="4" />
              {/* Wide sleeves */}
              <path d="M 155 240 L 125 320 L 155 325 L 175 255 Z" fill={outfit.primaryColor || '#1e3a8a'} stroke="#18181b" strokeWidth="2" />
              <path d="M 245 240 L 275 320 L 245 325 L 225 255 Z" fill={outfit.primaryColor || '#1e3a8a'} stroke="#18181b" strokeWidth="2" />
              {/* Golden cuffs */}
              <rect x="125" y="315" width="30" height="10" fill="#f59e0b" />
              <rect x="245" y="315" width="30" height="10" fill="#f59e0b" />
              {/* Traditional Ornamental Belbog' (Waist Sash) */}
              <path d="M 150 310 L 250 310 L 250 330 L 150 330 Z" fill={outfit.secondaryColor || '#d97706'} stroke="#b45309" strokeWidth="2" />
              {/* Hanging sash knot */}
              <path d="M 190 325 L 185 365 L 205 365 L 200 325 Z" fill={outfit.secondaryColor || '#d97706'} />
            </g>
          )}

          {/* 🏫 SCHOOL GIRL (Sakura) */}
          {outfit.id === 'school_girl' && (
            <g id="school-girl-design">
              {/* Pleated navy skirt */}
              <path d="M 155 310 L 245 310 L 260 365 L 140 365 Z" fill={outfit.primaryColor || '#1e293b'} stroke="#18181b" strokeWidth="2" />
              {/* White blouse */}
              <path d="M 165 240 L 235 240 L 240 310 L 160 310 Z" fill={outfit.secondaryColor || '#ffffff'} stroke="#18181b" strokeWidth="2" />
              {/* Sailor Collar */}
              <path d="M 160 240 L 200 265 L 240 240 L 245 255 L 200 280 L 155 255 Z" fill={outfit.primaryColor || '#1e293b'} stroke="#18181b" strokeWidth="2" />
              {/* Red Ribbon / Bow */}
              <polygon points="200,270 188,260 188,278" fill={outfit.accentColor || '#e11d48'} />
              <polygon points="200,270 212,260 212,278" fill={outfit.accentColor || '#e11d48'} />
              <circle cx="200" cy="270" r="4" fill="#ffffff" />
            </g>
          )}

          {/* 🏫 SCHOOL BOY (Ren) */}
          {outfit.id === 'school_boy' && (
            <g id="school-boy-design">
              {/* Trousers */}
              <path d="M 165 315 L 235 315 L 235 390 L 165 390 Z" fill={outfit.primaryColor || '#0f172a'} stroke="#18181b" strokeWidth="2" />
              {/* Blazer Jacket */}
              <path d="M 160 240 L 240 240 L 245 320 L 155 320 Z" fill={outfit.primaryColor || '#0f172a'} stroke="#18181b" strokeWidth="2" />
              {/* White shirt insert */}
              <polygon points="188,240 212,240 200,285" fill="#ffffff" />
              {/* Tie */}
              <polygon points="198,255 202,255 204,295 200,302 196,295" fill={outfit.accentColor || '#0284c7'} />
              {/* Gold blazer buttons */}
              <circle cx="196" cy="305" r="2.5" fill="#f59e0b" />
              <circle cx="204" cy="305" r="2.5" fill="#f59e0b" />
            </g>
          )}

          {/* 🥷 NINJA SUIT (Hayato) */}
          {outfit.id === 'ninja_suit' && (
            <g id="ninja-suit-design">
              {/* Dark ninja pants */}
              <path d="M 165 310 L 235 310 L 240 395 L 160 395 Z" fill={outfit.primaryColor || '#18181b'} stroke="#18181b" strokeWidth="2" />
              {/* Cross-wrap ninja tunic */}
              <path d="M 160 240 L 240 240 L 245 320 L 155 320 Z" fill={outfit.primaryColor || '#18181b'} stroke="#18181b" strokeWidth="2" />
              <line x1="160" y1="240" x2="220" y2="310" stroke={outfit.accentColor || '#dc2626'} strokeWidth="2.5" />
              <line x1="240" y1="240" x2="180" y2="310" stroke={outfit.accentColor || '#dc2626'} strokeWidth="2.5" />
              {/* Red ninja sash */}
              <rect x="155" y="310" width="90" height="15" fill={outfit.accentColor || '#dc2626'} />
              {/* Arm guards */}
              <rect x="135" y="280" width="16" height="30" rx="3" fill="#27272a" />
              <rect x="249" y="280" width="16" height="30" rx="3" fill="#27272a" />
            </g>
          )}

          {/* 🔮 FANTASY MAGE (Lyra) */}
          {outfit.id === 'fantasy_mage' && (
            <g id="fantasy-mage-design">
              {/* Flowing wizard robe */}
              <path d="M 155 240 L 245 240 L 270 410 L 130 410 Z" fill={outfit.primaryColor || '#312e81'} stroke="#18181b" strokeWidth="2" />
              {/* Center magical starlight banner */}
              <path d="M 185 240 L 215 240 L 220 410 L 180 410 Z" fill={outfit.secondaryColor || '#4f46e5'} />
              <circle cx="200" cy="280" r="6" fill={outfit.accentColor || '#fbbf24'} />
              <circle cx="200" cy="330" r="5" fill={outfit.accentColor || '#fbbf24'} />
              <circle cx="200" cy="380" r="4" fill={outfit.accentColor || '#fbbf24'} />
              {/* Gold hem trim */}
              <line x1="130" y1="406" x2="270" y2="406" stroke="#fbbf24" strokeWidth="3" />
            </g>
          )}

          {/* 🥋 MARTIAL ARTS GI (Kenji) */}
          {outfit.id === 'martial_arts_gi' && (
            <g id="martial-arts-gi-design">
              <path d="M 165 315 L 235 315 L 240 395 L 160 395 Z" fill={outfit.primaryColor || '#f8fafc'} stroke="#18181b" strokeWidth="2" />
              <path d="M 160 240 L 240 240 L 245 320 L 155 320 Z" fill={outfit.primaryColor || '#f8fafc'} stroke="#18181b" strokeWidth="2" />
              <line x1="160" y1="240" x2="215" y2="305" stroke="#cbd5e1" strokeWidth="3" />
              <line x1="240" y1="240" x2="185" y2="305" stroke="#cbd5e1" strokeWidth="3" />
              {/* Black Belt (Obi) */}
              <rect x="155" y="305" width="90" height="16" fill={outfit.secondaryColor || '#0f172a'} stroke="#000000" strokeWidth="1.5" />
              {/* Hanging belt ends */}
              <rect x="190" y="321" width="8" height="35" fill={outfit.secondaryColor || '#0f172a'} />
              <rect x="202" y="321" width="8" height="30" fill={outfit.secondaryColor || '#0f172a'} />
            </g>
          )}

          {/* 👑 PRINCESS GOWN (Aurelia) */}
          {outfit.id === 'princess_gown' && (
            <g id="princess-gown-design">
              {/* Bell-shaped ballroom gown */}
              <path d="M 160 295 C 160 295, 120 340, 115 415 L 285 415 C 280 340, 240 295, 240 295 Z" fill={outfit.primaryColor || '#ec4899'} stroke="#18181b" strokeWidth="2" />
              {/* Layered white lace petticoat preview */}
              <path d="M 170 300 C 180 340, 185 390, 200 415 C 215 390, 220 340, 230 300 Z" fill={outfit.secondaryColor || '#fdf2f8'} />
              {/* Corset bodice */}
              <path d="M 165 240 L 235 240 L 240 300 L 160 300 Z" fill={outfit.primaryColor || '#ec4899'} stroke="#18181b" strokeWidth="2" />
              {/* Puffy off-shoulder sleeve bubbles */}
              <circle cx="150" cy="250" r="14" fill={outfit.secondaryColor || '#fdf2f8'} stroke="#18181b" strokeWidth="1.5" />
              <circle cx="250" cy="250" r="14" fill={outfit.secondaryColor || '#fdf2f8'} stroke="#18181b" strokeWidth="1.5" />
            </g>
          )}

          {/* 🤴 PRINCE REGAL (Julian) */}
          {outfit.id === 'prince_regal' && (
            <g id="prince-regal-design">
              <path d="M 165 315 L 235 315 L 235 395 L 165 395 Z" fill="#0f172a" stroke="#18181b" strokeWidth="2" />
              <path d="M 160 240 L 240 240 L 245 320 L 155 320 Z" fill={outfit.primaryColor || '#1e3a8a'} stroke="#18181b" strokeWidth="2" />
              {/* Diagonal Royal Sash */}
              <polygon points="170,240 185,240 235,320 220,320" fill={outfit.accentColor || '#eab308'} />
              {/* Epaulettes with gold tassels */}
              <ellipse cx="158" cy="242" rx="10" ry="5" fill="#f59e0b" />
              <ellipse cx="242" cy="242" rx="10" ry="5" fill="#f59e0b" />
            </g>
          )}

          {/* 🧥 CASUAL HOODIE (Mia / Streetwear) */}
          {outfit.id === 'casual_hoodie' && (
            <g id="casual-hoodie-design">
              {/* Jeans / shorts */}
              <path d="M 165 315 L 235 315 L 235 380 L 165 380 Z" fill="#334155" stroke="#18181b" strokeWidth="2" />
              {/* Oversized hoodie */}
              <path d="M 150 240 L 250 240 L 255 330 L 145 330 Z" rx="12" fill={outfit.primaryColor || '#ec4899'} stroke="#18181b" strokeWidth="2" />
              {/* Front pouch pocket */}
              <rect x="175" y="285" width="50" height="28" rx="6" fill={outfit.secondaryColor || '#fce7f3'} stroke="#18181b" strokeWidth="1.5" />
              {/* Drawstrings */}
              <line x1="190" y1="245" x2="190" y2="275" stroke="#ffffff" strokeWidth="2" />
              <line x1="210" y1="245" x2="210" y2="275" stroke="#ffffff" strokeWidth="2" />
            </g>
          )}

          {/* ⚡ CYBERPUNK (Jin) */}
          {outfit.id === 'cyberpunk' && (
            <g id="cyberpunk-design">
              <path d="M 165 315 L 235 315 L 235 390 L 165 390 Z" fill="#09090b" stroke="#18181b" strokeWidth="2" />
              <path d="M 155 240 L 245 240 L 250 325 L 150 325 Z" fill={outfit.primaryColor || '#09090b'} stroke="#18181b" strokeWidth="2" />
              {/* Neon Cyan & Magenta Accents */}
              <line x1="170" y1="245" x2="170" y2="320" stroke="#06b6d4" strokeWidth="3" />
              <line x1="230" y1="245" x2="230" y2="320" stroke="#ec4899" strokeWidth="3" />
              {/* Cyber Collar */}
              <path d="M 175 235 L 200 250 L 225 235 Z" fill="#27272a" stroke="#06b6d4" strokeWidth="1.5" />
            </g>
          )}

          {/* 👘 JAPANESE KIMONO / YUKATA (Aoi) */}
          {outfit.id === 'kimono' && (
            <g id="kimono-design">
              <path d="M 155 240 L 245 240 L 260 415 L 140 415 Z" fill={outfit.primaryColor || '#4338ca'} stroke="#18181b" strokeWidth="2" />
              {/* Overlapping collar */}
              <line x1="165" y1="240" x2="205" y2="295" stroke="#ffffff" strokeWidth="4" />
              <line x1="235" y1="240" x2="195" y2="295" stroke="#ffffff" strokeWidth="4" />
              {/* Wide Obi Sash */}
              <rect x="150" y="295" width="100" height="25" fill={outfit.secondaryColor || '#f43f5e'} stroke="#18181b" strokeWidth="2" />
              {/* Golden cord (Obijime) */}
              <line x1="150" y1="307" x2="250" y2="307" stroke="#fef08a" strokeWidth="2" />
            </g>
          )}

          {/* 🏃 SPORTSWEAR */}
          {outfit.id === 'sportswear' && (
            <g id="sportswear-design">
              <rect x="165" y="315" width="70" height="60" rx="8" fill="#1e293b" stroke="#18181b" strokeWidth="2" />
              <path d="M 155 240 L 245 240 L 245 320 L 155 320 Z" fill={outfit.primaryColor || '#ef4444'} stroke="#18181b" strokeWidth="2" />
              {/* Athletic Side Stripes */}
              <line x1="162" y1="240" x2="162" y2="320" stroke="#ffffff" strokeWidth="3" />
              <line x1="238" y1="240" x2="238" y2="320" stroke="#ffffff" strokeWidth="3" />
            </g>
          )}

          {/* 🌙 PAJAMAS */}
          {outfit.id === 'pajamas' && (
            <g id="pajamas-design">
              <rect x="165" y="315" width="70" height="80" rx="10" fill={outfit.primaryColor || '#bae6fd'} stroke="#18181b" strokeWidth="2" />
              <path d="M 155 240 L 245 240 L 245 325 L 155 325 Z" fill={outfit.primaryColor || '#bae6fd'} stroke="#18181b" strokeWidth="2" />
              {/* Buttons */}
              <circle cx="200" cy="260" r="3" fill="#ffffff" />
              <circle cx="200" cy="285" r="3" fill="#ffffff" />
              <circle cx="200" cy="310" r="3" fill="#ffffff" />
            </g>
          )}

          {/* ❄️ WINTER COAT */}
          {outfit.id === 'winter_coat' && (
            <g id="winter-coat-design">
              <path d="M 150 240 L 250 240 L 260 380 L 140 380 Z" fill={outfit.primaryColor || '#0369a1'} stroke="#18181b" strokeWidth="2" />
              {/* Fluffy Fur Collar */}
              <ellipse cx="200" cy="245" rx="42" ry="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
              {/* Wooden Toggles */}
              <line x1="195" y1="280" x2="205" y2="280" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              <line x1="195" y1="315" x2="205" y2="315" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              <line x1="195" y1="350" x2="205" y2="350" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* ── 7. HEAD & FACE BASE ── */}
        <g id="head-base">
          {/* Ears */}
          <ellipse cx="120" cy="165" rx="10" ry="14" fill={skinTone} stroke="#18181b" strokeWidth="2" />
          <ellipse cx="280" cy="165" rx="10" ry="14" fill={skinTone} stroke="#18181b" strokeWidth="2" />
          <ellipse cx="121" cy="165" rx="5" ry="8" fill="#fda4af" opacity="0.6" />
          <ellipse cx="279" cy="165" rx="5" ry="8" fill="#fda4af" opacity="0.6" />

          {/* Head Shape */}
          {config.headShape === 'round' && (
            <circle cx="200" cy="155" r="76" fill={skinTone} stroke="#18181b" strokeWidth="2.5" />
          )}
          {config.headShape === 'chibi' && (
            <path
              d="M 124 150 C 124 100, 276 100, 276 150 C 280 185, 270 215, 200 230 C 130 215, 120 185, 124 150 Z"
              fill={skinTone}
              stroke="#18181b"
              strokeWidth="2.5"
            />
          )}
          {config.headShape === 'oval' && (
            <ellipse cx="200" cy="155" rx="74" ry="78" fill={skinTone} stroke="#18181b" strokeWidth="2.5" />
          )}
          {config.headShape === 'heart' && (
            <path
              d="M 124 140 C 124 95, 276 95, 276 140 C 278 180, 250 218, 200 232 C 150 218, 122 180, 124 140 Z"
              fill={skinTone}
              stroke="#18181b"
              strokeWidth="2.5"
            />
          )}

          {/* ── 8. BLUSH & FRECKLES ── */}
          {blush === 'soft' && (
            <g opacity="0.55">
              <ellipse cx="150" cy="180" rx="14" ry="7" fill="#f43f5e" />
              <ellipse cx="250" cy="180" rx="14" ry="7" fill="#f43f5e" />
            </g>
          )}
          {blush === 'cute_lines' && (
            <g stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" opacity="0.75">
              <line x1="142" y1="178" x2="148" y2="184" />
              <line x1="148" y1="178" x2="154" y2="184" />
              <line x1="154" y1="178" x2="160" y2="184" />
              <line x1="240" y1="178" x2="246" y2="184" />
              <line x1="246" y1="178" x2="252" y2="184" />
              <line x1="252" y1="178" x2="258" y2="184" />
            </g>
          )}
          {blush === 'anime_cheeks' && (
            <g opacity="0.65">
              <ellipse cx="148" cy="180" rx="16" ry="8" fill="#fb7185" />
              <ellipse cx="252" cy="180" rx="16" ry="8" fill="#fb7185" />
              <circle cx="144" cy="178" r="2.5" fill="#ffffff" />
              <circle cx="256" cy="178" r="2.5" fill="#ffffff" />
            </g>
          )}
          {blush === 'heart_blush' && (
            <g fill="#ec4899" opacity="0.8">
              {/* Left Heart */}
              <path d="M 150 178 C 150 174, 144 172, 142 176 C 140 180, 150 186, 150 186 C 150 186, 160 180, 158 176 C 156 172, 150 174, 150 178 Z" />
              {/* Right Heart */}
              <path d="M 250 178 C 250 174, 244 172, 242 176 C 240 180, 250 186, 250 186 C 250 186, 260 180, 258 176 C 256 172, 250 174, 250 178 Z" />
            </g>
          )}

          {freckles && (
            <g fill="#b45309" opacity="0.6">
              <circle cx="148" cy="176" r="1.5" />
              <circle cx="154" cy="178" r="1.5" />
              <circle cx="160" cy="175" r="1.5" />
              <circle cx="240" cy="175" r="1.5" />
              <circle cx="246" cy="178" r="1.5" />
              <circle cx="252" cy="176" r="1.5" />
            </g>
          )}

          {/* ── 9. NOSE ── */}
          <path d="M 200 174 L 198 178" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />

          {/* ── 10. EYEBROWS ── */}
          <g stroke={eyebrows.color || hair.color || '#18181b'} strokeWidth="3" strokeLinecap="round" fill="none">
            {effectiveEmotion === 'angry' ? (
              <>
                <path d="M 142 135 L 172 144" />
                <path d="M 258 135 L 228 144" />
              </>
            ) : effectiveEmotion === 'sad' || effectiveEmotion === 'shy' ? (
              <>
                <path d="M 142 144 L 172 138" />
                <path d="M 258 144 L 228 138" />
              </>
            ) : effectiveEmotion === 'surprised' ? (
              <>
                <path d="M 144 130 Q 158 122 172 130" />
                <path d="M 228 130 Q 242 122 256 130" />
              </>
            ) : (
              <>
                <path d="M 144 138 Q 158 133 172 138" />
                <path d="M 228 138 Q 242 133 256 138" />
              </>
            )}
          </g>

          {/* ── 11. EYES (WITH BLINKING & PUPIL TRACKING) ── */}
          <g id="character-eyes">
            {isBlinking || effectiveEmotion === 'sleepy' ? (
              // Closed Happy / Blinking curved lines
              <g stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" fill="none">
                <path d="M 142 160 Q 158 168 174 160" />
                <path d="M 226 160 Q 242 168 258 160" />
              </g>
            ) : effectiveEmotion === 'happy' ? (
              // Anime closed laughing eyes ^_^
              <g stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" fill="none">
                <path d="M 142 162 Q 158 148 174 162" />
                <path d="M 226 162 Q 242 148 258 162" />
              </g>
            ) : (
              // Open animated eyes
              <g>
                {/* Eye whites */}
                <ellipse cx="158" cy="158" rx="18" ry="20" fill="#ffffff" stroke="#18181b" strokeWidth="2.5" />
                <ellipse cx="242" cy="158" rx="18" ry="20" fill="#ffffff" stroke="#18181b" strokeWidth="2.5" />

                {/* Left Pupil (Clamped & follows mouse) */}
                <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                  <ellipse cx="158" cy="158" rx="12" ry="15" fill="url(#eyeGrad)" />
                  {/* Eye inner highlight sparkles */}
                  <circle cx="154" cy="152" r="4.5" fill="#ffffff" />
                  <circle cx="162" cy="165" r="2.5" fill="#ffffff" opacity="0.8" />
                  {eyes.shape === 'starry' && (
                    <polygon points="158,154 160,158 164,158 161,161 162,165 158,162 154,165 155,161 152,158 156,158" fill="#fef08a" />
                  )}
                </g>

                {/* Right Pupil */}
                <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                  <ellipse cx="242" cy="158" rx="12" ry="15" fill="url(#eyeGrad)" />
                  <circle cx="238" cy="152" r="4.5" fill="#ffffff" />
                  <circle cx="246" cy="165" r="2.5" fill="#ffffff" opacity="0.8" />
                  {eyes.shape === 'starry' && (
                    <polygon points="242,154 244,158 248,158 245,161 246,165 242,162 238,165 239,161 236,158 240,158" fill="#fef08a" />
                  )}
                </g>

                {/* Upper Anime Eyelashes */}
                <path d="M 138 148 Q 158 140 178 148" stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 222 148 Q 242 140 262 148" stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                {gender === 'girl' && (
                  <>
                    <path d="M 176 146 L 181 142" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 260 146 L 265 142" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
                  </>
                )}
              </g>
            )}
          </g>

          {/* ── 12. MOUTH (LIP-SYNC & EXPRESSIONS) ── */}
          <g id="character-mouth">
            {isSpeaking && mouthFrame === 1 ? (
              // Open talking mouth frame
              <ellipse cx="200" cy="195" rx="8" ry="7" fill="#b91c1c" stroke="#18181b" strokeWidth="2">
                <ellipse cx="200" cy="198" rx="5" ry="3" fill="#f43f5e" />
              </ellipse>
            ) : effectiveEmotion === 'happy' ? (
              <path d="M 191 190 Q 200 204 209 190 Z" fill="#f43f5e" stroke="#18181b" strokeWidth="2" />
            ) : effectiveEmotion === 'surprised' ? (
              <ellipse cx="200" cy="194" rx="6" ry="9" fill="#991b1b" stroke="#18181b" strokeWidth="2" />
            ) : effectiveEmotion === 'sad' ? (
              <path d="M 193 197 Q 200 190 207 197" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : effectiveEmotion === 'angry' ? (
              <path d="M 192 196 L 208 193" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : effectiveEmotion === 'shy' ? (
              <path d="M 194 193 Q 200 197 206 193" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            ) : config.mouth.shape === 'cat_w' ? (
              <path d="M 190 192 Q 195 197 200 192 Q 205 197 210 192" stroke="#18181b" strokeWidth="2" fill="none" />
            ) : config.mouth.shape === 'grin' ? (
              <path d="M 188 191 Q 200 202 212 191 Z" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
            ) : (
              // Default gentle smile
              <path d="M 192 192 Q 200 198 208 192" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}
          </g>
        </g>

        {/* ── 13. FRONT HAIR & BANGS ── */}
        <g id="front-hair">
          {hair.style === 'spiky_anime' && (
            <path
              d="M 120 150 L 140 100 L 160 120 L 180 85 L 200 120 L 220 85 L 240 120 L 260 100 L 280 150 C 270 170, 250 135, 200 135 C 150 135, 130 170, 120 150 Z"
              fill="url(#hairGrad)"
              stroke="#18181b"
              strokeWidth="2.5"
            />
          )}

          {hair.style === 'bob_cut' && (
            <path
              d="M 120 150 C 115 110, 150 80, 200 80 C 250 80, 285 110, 280 150 C 285 180, 275 220, 265 220 C 255 220, 250 145, 200 140 C 150 145, 145 220, 135 220 C 125 220, 115 180, 120 150 Z"
              fill="url(#hairGrad)"
              stroke="#18181b"
              strokeWidth="2.5"
            />
          )}

          {hair.style === 'twin_tails' && (
            <g>
              {/* Cute front bangs */}
              <path
                d="M 122 140 C 125 90, 275 90, 278 140 C 265 140, 250 120, 200 135 C 150 120, 135 140, 122 140 Z"
                fill="url(#hairGrad)"
                stroke="#18181b"
                strokeWidth="2.5"
              />
              {/* Side strands framing face */}
              <path d="M 124 140 C 120 170, 125 200, 132 215 C 135 180, 135 150, 140 140 Z" fill="url(#hairGrad)" />
              <path d="M 276 140 C 280 170, 275 200, 268 215 C 265 180, 265 150, 260 140 Z" fill="url(#hairGrad)" />
            </g>
          )}

          {hair.style === 'long_flowing' && (
            <g>
              <path
                d="M 122 140 C 125 90, 275 90, 278 140 C 260 138, 240 115, 200 135 C 160 115, 140 138, 122 140 Z"
                fill="url(#hairGrad)"
                stroke="#18181b"
                strokeWidth="2.5"
              />
              <path d="M 122 140 L 115 250 L 135 230 L 138 140 Z" fill="url(#hairGrad)" stroke="#18181b" strokeWidth="2" />
              <path d="M 278 140 L 285 250 L 265 230 L 262 140 Z" fill="url(#hairGrad)" stroke="#18181b" strokeWidth="2" />
            </g>
          )}

          {hair.style === 'short_messy' && (
            <path
              d="M 120 150 L 135 110 L 155 125 L 175 95 L 195 120 L 215 95 L 235 125 L 255 110 L 280 150 C 260 140, 240 130, 200 135 C 160 130, 140 140, 120 150 Z"
              fill="url(#hairGrad)"
              stroke="#18181b"
              strokeWidth="2.5"
            />
          )}

          {hair.style === 'short_slick' && (
            <path
              d="M 122 150 C 120 90, 280 90, 278 150 C 270 130, 240 120, 200 125 C 160 120, 130 130, 122 150 Z"
              fill="url(#hairGrad)"
              stroke="#18181b"
              strokeWidth="2.5"
            />
          )}

          {/* Fallback standard bangs for other hairstyles */}
          {!['spiky_anime', 'bob_cut', 'twin_tails', 'long_flowing', 'short_messy', 'short_slick'].includes(hair.style) && (
            <path
              d="M 122 145 C 125 90, 275 90, 278 145 C 265 140, 245 120, 200 135 C 155 120, 135 140, 122 145 Z"
              fill="url(#hairGrad)"
              stroke="#18181b"
              strokeWidth="2.5"
            />
          )}

          {/* Hair Glint / Shine Band */}
          <path
            d="M 145 115 Q 200 105 255 115"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>

        {/* ── 14. HEADWEAR (DO'PPI, CROWN, CAT EARS, ETC.) ── */}
        <g id="headwear-item">
          {/* 🇺🇿 AUTHENTIC UZBEK DOPPI (Chust Skullcap with white pepper embroidery) */}
          {headwear === 'doppi' && (
            <g id="uzbek-doppi" transform="translate(200, 92)">
              {/* Black velvet square-curved cap base */}
              <path
                d="M -60 20 C -60 -15, 60 -15, 60 20 Z"
                fill={config.headwearColor || '#09090b'}
                stroke="#27272a"
                strokeWidth="2"
              />
              {/* White Bodom / Qalampir (almond/pepper) traditional embroidery petals */}
              <g stroke="#ffffff" strokeWidth="2.2" fill="none">
                {/* Center-left almond motif */}
                <path d="M -30 16 C -35 2, -20 -4, -12 8 C -8 14, -20 18, -30 16 Z" />
                {/* Center-right almond motif */}
                <path d="M 30 16 C 35 2, 20 -4, 12 8 C 8 14, 20 18, 30 16 Z" />
                {/* Lower decorative wave border (Yakandoz) */}
                <path d="M -56 18 Q -40 14 -24 18 Q -8 14 8 18 Q 24 14 40 18 Q 50 14 56 18" strokeWidth="2" />
              </g>
            </g>
          )}

          {/* 👑 ROYAL GOLDEN CROWN */}
          {headwear === 'crown' && (
            <g transform="translate(200, 72)">
              <polygon points="-38,20 -42,-12 -18,4 0,-18 18,4 42,-12 38,20" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
              <circle cx="-42" cy="-12" r="3.5" fill="#ef4444" />
              <circle cx="0" cy="-18" r="4.5" fill="#3b82f6" />
              <circle cx="42" cy="-12" r="3.5" fill="#10b981" />
            </g>
          )}

          {/* 🐱 CAT EARS */}
          {headwear === 'cat_ears' && (
            <g transform="translate(200, 85)">
              {/* Left ear */}
              <polygon points="-65,25 -55,-15 -25,15" fill={config.headwearColor || hair.color} stroke="#18181b" strokeWidth="2" />
              <polygon points="-58,20 -52,-5 -32,15" fill="#fda4af" />
              {/* Right ear */}
              <polygon points="65,25 55,-15 25,15" fill={config.headwearColor || hair.color} stroke="#18181b" strokeWidth="2" />
              <polygon points="58,20 52,-5 32,15" fill="#fda4af" />
            </g>
          )}

          {/* 🐰 BUNNY EARS */}
          {headwear === 'bunny_ears' && (
            <g transform="translate(200, 75)">
              <ellipse cx="-35" cy="-25" rx="10" ry="32" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
              <ellipse cx="-35" cy="-25" rx="5" ry="24" fill="#fda4af" />
              <ellipse cx="35" cy="-25" rx="10" ry="32" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
              <ellipse cx="35" cy="-25" rx="5" ry="24" fill="#fda4af" />
            </g>
          )}

          {/* 🎀 SCHOOL RIBBON / BOW */}
          {headwear === 'school_ribbon' && (
            <g transform="translate(200, 85)">
              <polygon points="0,0 -25,-12 -25,12" fill={config.headwearColor || '#ec4899'} stroke="#18181b" strokeWidth="2" />
              <polygon points="0,0 25,-12 25,12" fill={config.headwearColor || '#ec4899'} stroke="#18181b" strokeWidth="2" />
              <circle cx="0" cy="0" r="5" fill="#fbcfe8" />
            </g>
          )}

          {/* 🧙 WIZARD HAT */}
          {headwear === 'wizard_hat' && (
            <g transform="translate(200, 85)">
              <ellipse cx="0" cy="15" rx="70" ry="14" fill={config.headwearColor || '#312e81'} stroke="#18181b" strokeWidth="2" />
              <polygon points="-40,15 0,-60 40,15" fill={config.headwearColor || '#312e81'} stroke="#18181b" strokeWidth="2" />
              <rect x="-40" y="8" width="80" height="8" fill="#fbbf24" />
            </g>
          )}

          {/* 🥷 NINJA HEADBAND */}
          {headwear === 'ninja_band' && (
            <g transform="translate(200, 115)">
              <rect x="-65" y="-6" width="130" height="15" fill={config.headwearColor || '#dc2626'} stroke="#18181b" strokeWidth="2" />
              <rect x="-20" y="-8" width="40" height="19" rx="3" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
              {/* Clan insignia */}
              <circle cx="0" cy="1" r="4" fill="#18181b" />
            </g>
          )}

          {/* 🌸 FLOWER CLIP */}
          {headwear === 'flower_clip' && (
            <g transform="translate(255, 125)">
              <circle cx="0" cy="-6" r="6" fill="#f43f5e" />
              <circle cx="-6" cy="0" r="6" fill="#f43f5e" />
              <circle cx="6" cy="0" r="6" fill="#f43f5e" />
              <circle cx="0" cy="6" r="6" fill="#f43f5e" />
              <circle cx="0" cy="0" r="4.5" fill="#fef08a" />
            </g>
          )}

          {/* 🕶️ CYBER VISOR */}
          {headwear === 'cyber_visor' && (
            <path
              d="M 140 148 L 260 148 L 255 168 L 145 168 Z"
              fill="#06b6d4"
              opacity="0.85"
              stroke="#0891b2"
              strokeWidth="2"
            />
          )}
        </g>

        {/* ── 15. FRONT ACCESSORIES (GLASSES, SCARVES, MASKS) ── */}
        <g id="front-accessories">
          {accessory === 'glasses_round' && (
            <g stroke="#18181b" strokeWidth="2.5" fill="none">
              <circle cx="158" cy="158" r="16" />
              <circle cx="242" cy="158" r="16" />
              <line x1="174" y1="158" x2="226" y2="158" strokeWidth="2" />
              {/* Glass reflection */}
              <line x1="150" y1="150" x2="162" y2="150" stroke="#ffffff" strokeWidth="2" />
              <line x1="234" y1="150" x2="246" y2="150" stroke="#ffffff" strokeWidth="2" />
            </g>
          )}

          {accessory === 'glasses_stylish' && (
            <g stroke={config.accessoryColor || '#334155'} strokeWidth="2.5" fill="none">
              <rect x="140" y="146" width="36" height="24" rx="4" />
              <rect x="224" y="146" width="36" height="24" rx="4" />
              <line x1="176" y1="158" x2="224" y2="158" />
            </g>
          )}

          {accessory === 'sunglasses' && (
            <g fill="#09090b" stroke="#18181b" strokeWidth="2">
              <polygon points="138,145 178,145 174,170 142,170" />
              <polygon points="222,145 262,145 258,170 226,170" />
              <line x1="178" y1="152" x2="222" y2="152" stroke="#ffffff" strokeWidth="2" />
            </g>
          )}

          {accessory === 'face_mask' && (
            <rect x="175" y="180" width="50" height="28" rx="6" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          )}

          {accessory === 'scarf' && (
            <g>
              <ellipse cx="200" cy="235" rx="42" ry="12" fill={config.accessoryColor || '#dc2626'} stroke="#18181b" strokeWidth="2" />
              <path d="M 215 235 L 225 310 L 245 305 L 230 235 Z" fill={config.accessoryColor || '#dc2626'} stroke="#18181b" strokeWidth="2" />
            </g>
          )}

          {accessory === 'star_necklace' && (
            <g>
              <path d="M 188 238 Q 200 252 212 238" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
              <polygon points="200,248 202,252 206,252 203,255 204,258 200,256 196,258 197,255 194,252 198,252" fill="#fbbf24" />
            </g>
          )}
        </g>

        {/* ── 16. EMOTION FLOATING OVERLAYS ── */}
        <g id="emotion-particles">
          {effectiveEmotion === 'happy' && (
            <g className="animate-pulse">
              <path d="M 120 110 C 120 106, 114 104, 112 108 C 110 112, 120 118, 120 118 C 120 118, 130 112, 128 108 C 126 104, 120 106, 120 110 Z" fill="#ec4899" />
              <path d="M 275 105 C 275 101, 269 99, 267 103 C 265 107, 275 113, 275 113 C 275 113, 285 107, 283 103 C 281 99, 275 101, 275 105 Z" fill="#ec4899" />
            </g>
          )}

          {effectiveEmotion === 'shy' && (
            <ellipse cx="270" cy="140" rx="4" ry="7" fill="#38bdf8" opacity="0.85" className="animate-bounce" />
          )}

          {effectiveEmotion === 'angry' && (
            <g transform="translate(265, 120)" stroke="#dc2626" strokeWidth="2.5" fill="none">
              <path d="M -5 -8 L 5 8" />
              <path d="M 5 -8 L -5 8" />
              <rect x="-8" y="-8" width="16" height="16" rx="2" />
            </g>
          )}

          {effectiveEmotion === 'surprised' && (
            <g transform="translate(270, 115)">
              <text x="0" y="0" fontSize="28" fontWeight="bold" fill="#f59e0b" fontFamily="sans-serif">!</text>
            </g>
          )}

          {effectiveEmotion === 'thinking' && (
            <g transform="translate(270, 115)">
              <text x="0" y="0" fontSize="26" fontWeight="bold" fill="#8b5cf6" fontFamily="sans-serif">?</text>
            </g>
          )}

          {effectiveEmotion === 'sleepy' && (
            <g transform="translate(270, 115)" fill="#60a5fa" fontFamily="sans-serif" fontWeight="bold">
              <text x="0" y="-12" fontSize="14">z</text>
              <text x="8" y="-22" fontSize="18">Z</text>
              <text x="18" y="-34" fontSize="22">Z</text>
            </g>
          )}
        </g>

        {/* ── 17. INVISIBLE PETTING TOUCH REGIONS (FOR MINI-GAMES / FUN) ── */}
        {onPetPart && (
          <g opacity="0" className="cursor-pointer">
            {/* Head pat */}
            <circle cx="200" cy="115" r="45" onClick={(e) => { e.stopPropagation(); onPetPart('head'); }} />
            {/* Cheeks */}
            <rect x="135" y="165" width="130" height="30" onClick={(e) => { e.stopPropagation(); onPetPart('cheeks'); }} />
            {/* Tummy */}
            <rect x="160" y="260" width="80" height="60" onClick={(e) => { e.stopPropagation(); onPetPart('tummy'); }} />
            {/* Hands */}
            <circle cx="140" cy="340" r="25" onClick={(e) => { e.stopPropagation(); onPetPart('hands'); }} />
            <circle cx="260" cy="340" r="25" onClick={(e) => { e.stopPropagation(); onPetPart('hands'); }} />
          </g>
        )}
      </svg>
    </div>
  );
};
