

export const productController = async(req, res) => {
    return res
    .status(200)
    .json([
        {
            name: "Mobile",
            price: 8000
        },
        {
            name: "Lapy",
            price: 70000
        }
    ])
}