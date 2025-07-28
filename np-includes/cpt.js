const CustomPostType = require('../models/CustomPostType')
const NPError = require('./npError')

const registerCPT = (options) => {

    if (typeof options.slug == 'undefined') {
        return NPError(__dirname + 'cpt.js:7', 'Register CPT Slug undefined');
    }

    const foundCPTS = CustomPostType.findAll({
        where: {
            slug: options.slug
        }
    })

    if (foundCPTS.length > 0) {
        return false;
    }

    if (typeof options.title == 'undefined') {
        return NPError(__dirname + 'cpt.js:21', 'Register CPT Title undefined');
    }

    const newCPT = CustomPostType.create({

        title: options.title,
        slug: options.slug,
        archiveRewrite: options.archiveRewrite,
        postRewrite: options.postRewrite,
        useBasicEditor: options.useBasicEditor,
        useAdvancedEditor: options.useAdvancedEditor,
        useRest: options.useRest,
        menuName: options.menuName,
    })

    newCPT.save();


}

const unRegisterCPT = (slug) => {

    if (typeof slug == 'undefined') {
        return NPError(__dirname + 'cpt.js:44', 'CPT Unregister Slug undefined');
    }

    const foundCPTS = CustomPostType.findAll({
        where: {
            slug: slug
        }
    })

    if(foundCPTS.length > 0) {
        foundCPTS[0].delete();
        return true;
    } else {
        return false;
    }

}