const Blog = require('../model/blog.model')


exports.new_blog_entry = async (req, res) => {

    let entry = new Blog();
    entry.title = req.body.title;
    entry.readingTime = req.body.readingTime;
    entry.mainImage = req.body.mainImage;
    entry.resumen = req.body.resumen;
    entry.body = req.body.body;
    entry.meta = {
        created: new Date(),
        by: {
            name: "Matias",
            avatar: "-"
        }
    }


    let saved = await entry.save().catch(ex => { console.log(ex); return null });
    if (saved) {
        return res.status(200).send({ saved, message: "Nueva entrada generada", success: true })
    } else {
        return res.status(500).send({ message: "Error", success: false })
    }


}

exports.get_resumed_blogs = async (req, res) => {
    let blogs = await Blog.find()
        .select('title readingTime mainImage resumen meta')
        .catch(err => { return [] })

    if (blogs.length == 0) {
        return res.status(200).send({ message: " No existen blogs", blogs: [] })
    }

    return res.status(200).send({ success: true, blogs })
}

exports.get_blog_page = async (req, res) => {
    let blogId = req.params.blogId ? req.params.blogId : null;

    if (!blogId) {
        return res.status(403).send({ message: "No se ha recibido el ID del blog", success: false })
    }


    let blog = await Blog.findById(blogId).catch(ex => { return null })

    if (!blog) {
        return res.status(404).send({ message: "No existe el blog", success: false })
    }


    return res.status(200).send({ blog, message: "Blog encontrado", success: true })
}


exports.find_page = async (req, res) => {
    let criteria = req.query.search;
    let regex = new RegExp(criteria);

    let blogs = await Blog.find({ $or: [{ body: { $regex: regex, $options: 'i' } }, { title: { $regex: regex, $options: 'i' } }] }).catch(ex => { return [] });

    if (blogs.length > 0) {
        return res.status(200).send({ blogs: blogs, success: true });
    } else {
        return res.status(200).send({ blogs: [], success: false });
    }
}

exports.change_category = async (req, res) => {
    try {
        let category = req.query.category;
        if (category == -1 || category == "-1") {
            let blogs = await Blog.find().catch(ex => { return [] });

            if (blogs.length > 0) {
                return res.status(200).send({ blogs: blogs, success: true });
            } else {
                return res.status(200).send({ blogs: [], success: false });
            }
        } else {
            let blogs = await Blog.find({ category: category }).catch(ex => { return [] });

            if (blogs.length > 0) {
                return res.status(200).send({ blogs: blogs, success: true });
            } else {
                return res.status(200).send({ blogs: [], success: false });
            }
        }
    } catch (ex) {
        return res.status(500).send({ message: "Error al filtrar por categoría", success: false })
    }

}

exports.getCategories = (req, res) => {
    let categories = [{
        name: "Evaluación de Competencias Laborales",
        code: 0
    }, {
        name: "Brechas de Competencias Laborales",
        code: 1
    }];
    return res.status(200).send({ categories, success: true });
}
