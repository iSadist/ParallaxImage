type Axis = {
    x: number;
    y: number;
    z: number;
    rotation: number;
}

type ImageSources = {
    background: string;
    middle: string;
    front: string;
}

type ParallaxImageProps = {
    imageSrc: ImageSources;
    alt: string;
    className?: string;
};
