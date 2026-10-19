import { CharacterConfig, SceneBackground } from '../types/character';

const sceneGradients: Record<SceneBackground, string[]> = {
  sakura_garden: ['#fce7f3', '#fbcfe8', '#f472b6'],
  classroom: ['#e0f2fe', '#bae6fd', '#7dd3fc'],
  celestial_night: ['#0f172a', '#1e1b4b', '#312e81'],
  dojo: ['#fef3c7', '#fde68a', '#d97706'],
  beach: ['#cffafe', '#a5f3fc', '#38bdf8'],
  cozy_room: ['#ffedd5', '#fed7aa', '#fb923c'],
  registan_square: ['#fef9c3', '#fde047', '#0284c7'],
};

export async function exportCharacterPng(
  svgElement: SVGSVGElement,
  characterName: string,
  scene: SceneBackground = 'celestial_night'
): Promise<void> {
  const width = 1000;
  const height = 1200;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Draw scene gradient background
  const colors = sceneGradients[scene] || ['#1e1b4b', '#312e81'];
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, colors[0]);
  if (colors.length > 2) grad.addColorStop(0.5, colors[1]);
  grad.addColorStop(1, colors[colors.length - 1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Draw some decorative stars or cherry petals in the background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 40; i++) {
    const x = Math.sin(i * 99) * 0.5 + 0.5;
    const y = Math.cos(i * 33) * 0.5 + 0.5;
    const r = (i % 3) + 1.5;
    ctx.beginPath();
    ctx.arc(x * width, y * height * 0.7, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw ground shadow ellipse
  ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
  ctx.beginPath();
  ctx.ellipse(width / 2, height - 120, 220, 45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Serialize the character SVG
  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(svgElement);

  // Ensure xmlns is present
  if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.crossOrigin = 'anonymous';

  return new Promise((resolve) => {
    img.onload = () => {
      // Draw character centered
      const charWidth = 720;
      const charHeight = 960;
      const x = (width - charWidth) / 2;
      const y = height - charHeight - 80;
      ctx.drawImage(img, x, y, charWidth, charHeight);

      // Add watermark / title at top
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 36px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(characterName, width / 2, 70);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '500 20px Quicksand, sans-serif';
      ctx.fillText('YumeChibi • Anime Character Studio', width / 2, 110);

      URL.revokeObjectURL(url);

      // Trigger download
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `${characterName.toLowerCase().replace(/\s+/g, '_')}_yumechibi.png`;
      a.href = pngUrl;
      a.click();
      resolve();
    };
    img.src = url;
  });
}

export function exportCharacterJson(char: CharacterConfig): string {
  return JSON.stringify(char, null, 2);
}

export function importCharacterJson(jsonString: string): CharacterConfig | null {
  try {
    const data = JSON.parse(jsonString);
    if (!data.name || !data.hair || !data.eyes || !data.outfit) {
      throw new Error('Invalid character structure');
    }
    return {
      ...data,
      id: `imported_${Date.now()}`,
      createdAt: Date.now(),
    };
  } catch {
    return null;
  }
}
