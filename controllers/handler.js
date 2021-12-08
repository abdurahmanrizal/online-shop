exports.getHandler = (req,res,next) => {
    res.render("404",{
        pageTitle: "Page Not Found",
        path: '/404',
        productCss: true,
        formCss: true,
    })
}