import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get("http://localhost:3001/api/products/", ( {request} ) => {
        return HttpResponse.json([
            {
                name: "Polera A",
                description: "polera a",
                type: "Polera",
                material: "algodon",
                size: "L",
                gender: "M",
                color: "Verde",
                brand: "USM",
                quantity: "5",
                costPrice: "500",
                salePrice: "750",
                images: [
                    null
                ]
            },
            {
                name: "Polera B",
                description: "polera B",
                type: "Polera",
                material: "algodon",
                size: "L",
                gender: "F",
                color: "Verde",
                brand: "USM",
                quantity: "5",
                costPrice: "500",
                salePrice: "750",
                images: [
                    null
                ]
            }
        ])
    })
]