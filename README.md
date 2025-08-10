# Paralax Image

A React component that creates a parallax effect similar to Apple TV app icons. The component responds to mouse movement, creating a 3D tilt effect with multiple layered images.

## Installation

```bash
npm install paralax-image
```

## Usage

```tsx
import ParalaxImage from 'paralax-image';
import 'paralax-image/dist/index.css'; // Import the CSS

const App = () => {
  const imageSources = {
    background: '/path/to/background.jpg',
    middle: '/path/to/middle.png',
    front: '/path/to/front.png'
  };

  return (
    <ParalaxImage 
      imageSrc={imageSources} 
      alt="Description of the image"
    />
  );
};
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `imageSrc` | `ImageSources` | Yes | Object containing paths to the three image layers |
| `alt` | `string` | Yes | Alt text for accessibility |
| `className` | `string` | No | Additional CSS class name |

### ImageSources Type

```tsx
type ImageSources = {
  background: string;  // Background layer image
  middle: string;      // Middle layer image
  front: string;       // Front layer image
}
```

## Styling

The component uses CSS classes that you can override:

- `.paralax-image__wrapper` - The main container
- `.paralax-image__image1` - Background layer
- `.paralax-image__image2` - Middle layer  
- `.paralax-image__image3` - Front layer

## License

ISC

## Author

Jan Svensson
