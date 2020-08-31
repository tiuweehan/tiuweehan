// @ts-nocheck
import CMS from "netlify-cms-app"
import cloudinary from "netlify-cms-media-library-cloudinary"
import uploadcare from "netlify-cms-media-library-uploadcare"

import AboutPagePreview from "./preview-templates/AboutPagePreview"
import BlogPostPreview from "./preview-templates/BlogPostPreview"
import ExperiencePagePreview from "./preview-templates/ExperiencePagePreview"
import IndexPagePreview from "./preview-templates/IndexPagePreview"

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate("index", IndexPagePreview)
CMS.registerPreviewTemplate("about", AboutPagePreview)
CMS.registerPreviewTemplate("experience", ExperiencePagePreview)
CMS.registerPreviewTemplate("blog", BlogPostPreview)
