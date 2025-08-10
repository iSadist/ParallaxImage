// An image component that uses a parallax effect
// like on Apple TV app icons.

import { useCallback, useState } from 'react';

// Export types for consumers of the package
export type Axis = {
    x: number;
    y: number;
    z: number;
    rotation: number;
}

export type ImageSources = {
    background: string;
    middle: string;
    front: string;
}

export type ParallaxImageProps = {
    imageSrc: ImageSources;
    alt: string;
    className?: string;
};

function ParalaxImage({ imageSrc, alt }: ParallaxImageProps) {
    const [axis, setAxis] = useState<Axis>({ x: 0, y: 0, z: 0, rotation: 0 });

    // Increase the rotation effect
    const style1 = {
        transform: `
            rotate3D(${axis.x}, ${axis.y}, ${axis.z}, ${axis.rotation / 2}deg)
            translate3D(${axis.y * 5}px, ${-axis.x * 5}px, 0)
        `
    }

    const style2 = {
        transform: `
            rotate3D(${axis.x}, ${axis.y}, ${axis.z}, ${axis.rotation / 1.5}deg)
            translate3D(${axis.y * 10}px, ${-axis.x * 10}px, 0)
        `
    }

    const style3 = {
        transform: `
            rotate3D(${axis.x}, ${axis.y}, ${axis.z}, ${axis.rotation}deg)
            translate3D(${axis.y * 20}px, ${-axis.x * 20}px, 0)
        `
    }

    const getRelativeMousePosition = (event: React.MouseEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const relativeX = offsetX - centerX;
        const relativeY = offsetY - centerY;
        const distanceX = relativeX / centerX;
        const distanceY = relativeY / centerY;
        const mouseY = (distanceY + 1) * 0.5;
        const mouseX = (distanceX + 1) * 0.5;

        return { mouseX, mouseY, width: rect.width, height: rect.height };
    }

    const getAxis = (event: React.MouseEvent<HTMLElement>): Axis => {
        // Get the mouse position relative to the element
        const { mouseX, mouseY, height, width } = getRelativeMousePosition(event);

        const x = -(mouseY - 0.5) * 2;
        const y = (mouseX - 0.5) * 2;
        const z = 0;

        const distanceFromCenter = Math.sqrt(
            Math.pow(event.clientX - width / 2, 2) +
            Math.pow(event.clientY - height / 2, 2)
        );
        const rotation = distanceFromCenter / 100

        return { x, y, z, rotation: rotation };
    }

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const axis = getAxis(event);

        // Take a step towards the axis
        setAxis(prev => ({
            ...prev,
            x: prev.x + (axis.x - prev.x) * 0.1,
            y: prev.y + (axis.y - prev.y) * 0.1,
            z: prev.z + (axis.z - prev.z) * 0.1,
            rotation: prev.rotation + (axis.rotation - prev.rotation) * 0.1
        }));
    }, [setAxis]);

    const handleMouseLeave = useCallback(() => {
        const decreaseFactor = 0.9;

        // Animate the axis back to 0
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                setAxis(prev => ({
                    ...prev,
                    x: prev.x * decreaseFactor,
                    y: prev.y * decreaseFactor,
                    z: prev.z * decreaseFactor,
                    rotation: prev.rotation * decreaseFactor
                })
                );
            }, i * 10);
        }
    }, [setAxis]);

    return (
        <div
            className={"paralax-image__wrapper"}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img className={"paralax-image__image1"} style={style1} src={imageSrc.background} alt={alt} />
            <img className={"paralax-image__image2"} style={style2} src={imageSrc.middle} alt={alt} />
            <img className={"paralax-image__image3"} style={style3} src={imageSrc.front} alt={alt} />

            {/* Shadow is needed to make the effect more realistic */}
        </div>
    );
}

export default ParalaxImage;
