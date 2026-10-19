export type Language = 'uz' | 'en' | 'ru' | 'tr' | 'ja';

export type GenderStyle = 'girl' | 'boy' | 'neutral';

export type HeadShape = 'round' | 'oval' | 'chibi' | 'heart';

export type EyeShape =
  | 'sparkle'
  | 'cute'
  | 'anime'
  | 'cool'
  | 'wink'
  | 'cat'
  | 'starry'
  | 'sleepy'
  | 'gentle'
  | 'determined';

export type EyebrowShape = 'normal' | 'soft' | 'confident' | 'surprised' | 'worried';

export type MouthShape = 'smile' | 'open' | 'cat_w' | 'shy' | 'grin' | 'small_o';

export type BlushStyle = 'none' | 'soft' | 'cute_lines' | 'anime_cheeks' | 'heart_blush';

export type HairStyle =
  | 'twin_tails'
  | 'long_flowing'
  | 'bob_cut'
  | 'ponytail'
  | 'spiky_anime'
  | 'short_messy'
  | 'braids'
  | 'side_braid'
  | 'top_bun'
  | 'hime_cut'
  | 'curly_wave'
  | 'wolf_cut'
  | 'short_slick'
  | 'fluffy_curls'
  | 'undercut';

export type Headwear =
  | 'none'
  | 'school_ribbon'
  | 'beret'
  | 'headband'
  | 'ninja_band'
  | 'crown'
  | 'wizard_hat'
  | 'doppi'
  | 'cat_ears'
  | 'bunny_ears'
  | 'flower_clip'
  | 'cyber_visor'
  | 'samurai_helmet';

export type OutfitId =
  | 'school_girl'
  | 'school_boy'
  | 'casual_hoodie'
  | 'uzbek_atlas'
  | 'uzbek_chapan'
  | 'ninja_suit'
  | 'fantasy_mage'
  | 'martial_arts_gi'
  | 'princess_gown'
  | 'prince_regal'
  | 'sportswear'
  | 'cyberpunk'
  | 'kimono'
  | 'pajamas'
  | 'winter_coat'
  | 'yuimi_celestial';

export type ShoesId =
  | 'sneakers'
  | 'mary_janes'
  | 'boots'
  | 'sandals'
  | 'ninja_tabi'
  | 'traditional_ichig'
  | 'slippers';

export type AccessoryId =
  | 'none'
  | 'glasses_round'
  | 'glasses_stylish'
  | 'sunglasses'
  | 'cat_tail'
  | 'angel_wings'
  | 'demon_wings'
  | 'scarf'
  | 'star_necklace'
  | 'face_mask'
  | 'choker'
  | 'satchel_bag';

export type Emotion =
  | 'normal'
  | 'happy'
  | 'sad'
  | 'angry'
  | 'surprised'
  | 'thinking'
  | 'shy'
  | 'sleepy';

export type Personality =
  | 'cheerful'
  | 'kind'
  | 'smart'
  | 'warrior'
  | 'shy'
  | 'funny'
  | 'calm'
  | 'mysterious';

export type CharacterRole =
  | 'friend'
  | 'teacher'
  | 'storyteller'
  | 'coach'
  | 'anime_hero'
  | 'magical_guide';

export interface CharacterConfig {
  id: string;
  name: string;
  gender: GenderStyle;
  skinTone: string;
  headShape: HeadShape;
  eyes: {
    shape: EyeShape;
    color: string;
    size: 'small' | 'medium' | 'large';
  };
  eyebrows: {
    shape: EyebrowShape;
    color?: string;
  };
  mouth: {
    shape: MouthShape;
  };
  blush: BlushStyle;
  freckles: boolean;
  hair: {
    style: HairStyle;
    color: string;
    highlightColor: string;
  };
  headwear: Headwear;
  headwearColor?: string;
  outfit: {
    id: OutfitId;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  shoes: {
    id: ShoesId;
    color: string;
  };
  accessory: AccessoryId;
  accessoryColor?: string;
  personality: Personality;
  role: CharacterRole;
  voice: {
    pitch: number;
    rate: number;
    voiceURI: string;
  };
  emotion?: Emotion;
  favorite: boolean;
  createdAt: number;
}

export type SceneBackground =
  | 'sakura_garden'
  | 'classroom'
  | 'celestial_night'
  | 'dojo'
  | 'beach'
  | 'cozy_room'
  | 'registan_square';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'character';
  text: string;
  emotion?: Emotion;
  timestamp: number;
}

export type DeviceMode = 'auto' | 'pc' | 'phone';
export type ThemeMode = 'light' | 'dark' | 'auto';
export type AccentColor = 'sakura' | 'blue' | 'purple' | 'emerald';
export type AnimationLevel = 'full' | 'reduced' | 'off';

export interface UserSettings {
  deviceMode: DeviceMode;
  language: Language;
  theme: ThemeMode;
  accent: AccentColor;
  bgmEnabled: boolean;
  sfxEnabled: boolean;
  masterVolume: number;
  animationLevel: AnimationLevel;
  textSize: 'small' | 'normal' | 'large';
  guideGender: 'girl' | 'boy';
  hasCompletedIntro: boolean;
  userName: string;
  coins: number;
  stars: number;
  unlockedBadges: string[];
}
