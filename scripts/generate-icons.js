const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

const getSvg = (size, showText) => {
    const bottleY = showText ? 180 : 256;
    const scale = size / 512;
    
    // Minimal Perfume Bottle Design
    const bottleSvg = `
        <g transform="translate(256, ${bottleY}) scale(1.2) translate(-256, -256)">
            <!-- Cap -->
            <rect x="236" y="150" width="40" height="25" fill="white" />
            <!-- Neck -->
            <rect x="246" y="175" width="20" height="10" fill="white" opacity="0.8" />
            <!-- Body -->
            <rect x="196" y="185" width="120" height="160" rx="8" stroke="white" stroke-width="6" fill="none" />
            <!-- Liquid reflection line -->
            <line x1="220" y1="200" x2="220" y2="330" stroke="white" stroke-width="2" opacity="0.3" />
        </g>
    `;

    const textSvg = showText ? `
        <text x="256" y="440" fill="white" font-family="Inter, system-ui, sans-serif" font-size="42" font-weight="300" text-anchor="middle" style="letter-spacing: 15px; text-transform: lowercase;">balmy</text>
    ` : '';

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" fill="black" />
            ${bottleSvg}
            ${textSvg}
        </svg>
    `;
};

const getSplashSvg = (width, height) => {
    const size = Math.min(width, height) * 0.4;
    return `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="black" />
            <g transform="translate(${width/2 - 256}, ${height/2 - 256})">
                <!-- Bottle -->
                <g transform="translate(0, -40)">
                    <rect x="236" y="150" width="40" height="25" fill="white" />
                    <rect x="246" y="175" width="20" height="10" fill="white" opacity="0.8" />
                    <rect x="196" y="185" width="120" height="160" rx="8" stroke="white" stroke-width="6" fill="none" />
                    <line x1="220" y1="200" x2="220" y2="330" stroke="white" stroke-width="2" opacity="0.3" />
                </g>
                <!-- Text -->
                <text x="256" y="440" fill="white" font-family="Inter, system-ui, sans-serif" font-size="42" font-weight="300" text-anchor="middle" style="letter-spacing: 15px; text-transform: lowercase;">balmy</text>
            </g>
        </svg>
    `;
};

const icons = [
    { name: 'icon-72x72.png', size: 72 },
    { name: 'icon-96x96.png', size: 96 },
    { name: 'icon-128x128.png', size: 128 },
    { name: 'icon-144x144.png', size: 144 },
    { name: 'icon-152x152.png', size: 152 },
    { name: 'icon-192x192.png', size: 192 },
    { name: 'icon-384x384.png', size: 384 },
    { name: 'icon-512x512.png', size: 512 },
    { name: 'apple-icon-180x180.png', size: 180 },
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
];

const splashes = [
    { name: 'apple-splash-640x1136.png', width: 640, height: 1136 },
    { name: 'apple-splash-750x1334.png', width: 750, height: 1334 },
    { name: 'apple-splash-1170x2532.png', width: 1170, height: 2532 },
];

async function generate() {
    console.log('🚀 Generating PWA Icons...');

    for (const icon of icons) {
        const showText = icon.size >= 192;
        const svg = getSvg(icon.size, showText);
        await sharp(Buffer.from(svg))
            .resize(icon.size, icon.size)
            .png()
            .toFile(path.join(iconsDir, icon.name));
        console.log(`✅ Generated ${icon.name}`);
    }

    for (const splash of splashes) {
        const svg = getSplashSvg(splash.width, splash.height);
        await sharp(Buffer.from(svg))
            .resize(splash.width, splash.height)
            .png()
            .toFile(path.join(iconsDir, splash.name));
        console.log(`✅ Generated ${splash.name}`);
    }

    // Generate favicon.ico (simple 32x32)
    const faviconSvg = getSvg(32, false);
    await sharp(Buffer.from(faviconSvg))
        .resize(32, 32)
        .toFormat('png')
        .toFile(path.join(iconsDir, '../favicon.ico'));
    console.log(`✅ Generated favicon.ico`);

    console.log('✨ All icons generated successfully!');
}

generate().catch(err => {
    console.error('❌ Error generating icons:', err);
    process.exit(1);
});
