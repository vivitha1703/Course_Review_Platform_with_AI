exports.getAllCourses = async (req, res) => {
  try {
    const { department, level, instructor, search, sortBy, order } = req.query;

    let filter = {};

    if (department && department !== "All") {
      filter.department = new RegExp(department, "i");
    }

    if (level) {
      filter.level = level;
    }

    if (instructor && instructor !== "All") {
      filter.instructor = new RegExp(instructor, "i");
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") }
      ];
    }

    let sortQuery = {};
    if (sortBy) {
      const sortOrder = order === "desc" ? -1 : 1;
      sortQuery[sortBy] = sortOrder;
    }

    const courses = await Course.find(filter).sort(sortQuery);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
};
