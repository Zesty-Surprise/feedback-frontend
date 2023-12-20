import { join } from 'path'

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
    theme: {
        extend: {
            colors: {
                'detractor': "#FE5252",
                'neutral': "#D9D9D9",
                'promoter': "#00C100",
                color: {
                    accent: "#DE896E",
                    layout: "#FCF8F4",
                    highlight: "#F5E5D3",
                    hover: "#f5e5dd80",
                    text: "#595959",
                    text_light: "#A19F9F",
                },
            }
        },
    },
    safelist: [
        'bg-detractor',
        'bg-neutral',
        'bg-promoter',
    ],
    plugins: [
        forms,
        typography,
        skeleton({
            themes: {
                preset: [
                    {
                        name: 'skeleton',
                        enhancements: true,
                    },
                ],
            },
        }),
    ],
};
