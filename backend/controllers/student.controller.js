const CV = require("../models/CV");
const InternshipPost = require("../models/InternshipPost");
const ParsedCV = require("../models/ParsedCV");

/*
=====================================================
POST /api/student/parse/:id
=====================================================
*/

exports.parseCV = async (req, res) => {
    try {
        const cvId = req.params.id;

        const cv = await CV.findById(cvId);
        if (!cv) return res.status(404).json({ message: "CV not found" });

        const posts = await InternshipPost.find();
        if (!posts.length)
            return res.json({ message: "No posts" });

        let postsResult = [];

        for (const post of posts) {

            let skillScore = 0;

            const cvSkills = [
                ...(cv.skills?.programmingLanguages || []),
                ...(cv.skills?.frameworks || []),
                ...(cv.skills?.tools || [])
            ];

            if (cvSkills.length && post.skills?.length) {
                const matched = cvSkills.filter(s =>
                    post.skills.includes(s)
                );
                skillScore = (matched.length / post.skills.length) * 100;
            }

            let experienceScore = 0;

            if (post.experience === "NO_EXPERIENCE")
                experienceScore = cv.experiences === 0 ? 100 : 0;

            if (post.experience === "SOME_EXPERIENCE")
                experienceScore =
                    cv.experiences > 0 && cv.experiences < 3 ? 100 : 0;

            if (post.experience === "SPECIFIC_EXPERIENCE")
                experienceScore = cv.experiences >= 3 ? 100 : 0;

            let gpaScore = 100;

            const totalScore =
                (skillScore + experienceScore + gpaScore) / 3;

            postsResult.push({
                postId: post._id,
                score: Math.round(totalScore),
                skillScore: Math.round(skillScore),
                experienceScore: Math.round(experienceScore),
                gpaScore: Math.round(gpaScore),
                majorScore: 0
            });
        }

        const profileScore =
            postsResult.reduce((sum, p) => sum + p.score, 0) /
            postsResult.length;

        const parsed = await ParsedCV.findByIdAndUpdate(
            cvId,   // ✅ đúng: dùng _id
            {
                _id: cvId,
                profileScore: Math.round(profileScore),
                posts: postsResult
            },
            { upsert: true, new: true }
        );

        res.json(parsed);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

/*
=====================================================
GET /api/student/parsed/:id
=====================================================
*/

exports.getParsedCV = async (req, res) => {
    try {
        const parsed = await ParsedCV.findById(req.params.id)
            .populate("posts.postId", "title companyName");

        if (!parsed)
            return res.status(404).json({ message: "No parsed CV" });

        res.json(parsed);

    } catch (err) {
        res.status(500).json(err);
    }
};