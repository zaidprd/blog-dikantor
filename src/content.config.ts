import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Homepage collection schema (TIDAK BERUBAH)
const homepageCollection = defineCollection({
    loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
    schema: z.object({
        banner: z
            .object({
                title: z.string().optional(),
                content: z.string().optional(),
                image: z.string().optional(),
                button: z
                    .object({
                        label: z.string(),
                        link: z.string().default("/contact"),
                        enable: z.boolean().default(true),
                    })
                    .optional(),
            })
            .optional(),
        feature: z.object({
            title: z.string(),
            features: z.array(
                z.object({
                    name: z.string(),
                    icon: z.string().optional(),
                    content: z.string().optional(),
                }),
            ),
        }),
        services: z
            .array(
                z.object({
                    title: z.string().optional(),
                    content: z.string().optional(),
                    images: z.array(z.string()).optional(),
                    button: z
                        .object({
                            label: z.string(),
                            link: z.string().default("/contact"),
                            enable: z.boolean().default(true),
                        })
                        .optional(),
                }),
            )
            .optional(),
        workflow: z
            .object({
                title: z.string().optional(),
                description: z.string().optional(),
                image: z.string(),
            })
            .optional(),
        call_to_action: z
            .object({
                title: z.string().optional(),
                content: z.string().optional(),
                image: z.string(),
                button: z
                    .object({
                        label: z.string(),
                        link: z.string().default("/contact"),
                        enable: z.boolean().default(true),
                    })
                    .optional(),
            })
            .optional(),
    }),
});

//Contact collection schema (TIDAK BERUBAH)
const contactCollection = defineCollection({
    loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/contact" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        draft: z.boolean(),
        info: z.object({
            title: z.string(),
            description: z.string(),
            contacts: z.array(z.string()),
        }),
    }),
});

//pricing collection schema (TIDAK BERUBAH)
const pricingCollection = defineCollection({
    loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/pricing" }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        draft: z.boolean(),
        plans: z
            .array(
                z.object({
                    title: z.string(),
                    subtitle: z.string().optional(),
                    price: z.number(),
                    type: z.string(),
                    recommended: z.boolean().optional(),
                    features: z.array(z.string()),
                    button: z.object({
                        label: z.string(),
                        link: z.string().default("/contact"),
                    }),
                }),
            )
            .optional(),

        call_to_action: z
            .object({
                title: z.string(),
                content: z.string(),
                image: z.string(),
                button: z
                    .object({
                        enable: z.boolean().default(true),
                        label: z.string(),
                        link: z.string().default("/contact"),
                    })
                    .optional(),
            })
            .optional(),
    }),
});

// FAQ collection schema (TIDAK BERUBAH)
const faqCollection = defineCollection({
    loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/faq" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        draft: z.boolean(),
        faqs: z.array(
            z.object({
                title: z.string(),
                answer: z.string(),
            }),
        ),
    }),
});

// ❌ Blog collection schema (DIHAPUS KARENA SUDAH MIGRASI KE SANITY)
// const blogCollection = defineCollection({ ... });

// Pages collection schema (TIDAK BERUBAH)
const pagesCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        meta_title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        layout: z.string().optional(),
        draft: z.boolean().optional(),
    }),
});

// Export collections
export const collections = {
    homepage: homepageCollection,
    // ❌ blog: blogCollection, <-- Hapus referensi blog di sini
    pages: pagesCollection,
    contact: contactCollection,
    pricing: pricingCollection,
    faq: faqCollection,
};