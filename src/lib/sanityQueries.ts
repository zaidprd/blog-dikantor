// src/lib/sanityQueries.ts

// Query untuk mengambil SLUG dari SEMUA post yang dipublikasi (untuk getStaticPaths di pagination)
export const POSTS_SLUG_QUERY = `
  *[_type == "post" && publishedAt < now() && defined(slug.current)] {
    "slug": slug.current,
  }
`;

// Query untuk mengambil data yang dibutuhkan untuk ditampilkan di halaman daftar (index/pagination)
export const LIST_QUERY = `
  *[_type == "post" && defined(slug.current) && publishedAt < now()] 
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "summary": array::join(string::split(pt::text(body), "")[0..200], "") + "...",
    "imageUrl": mainImage.asset->url,
    "authorName": author->name, 
    "authorImage": author->image.asset->url,
    categories[]->{title, "slug": slug.current},
  }
`;


// Query untuk artikel tunggal (hanya untuk referensi)
export const SINGLE_POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    body[] {
      ...,
    },
    "author": author->{name, bio, "image": image.asset->url},
    "categories": categories[]->{title, "slug": slug.current},
  }
`;