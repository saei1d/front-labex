import Link from 'next/link';

async function getCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function Home() {
  const courses = await getCourses();

  return (
    <div>
      <h1 className="text-3xl mb-6">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course: any) => (
          <div key={course.id} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-sm text-blue-500">{course.level}</p>
            <Link href={`/courses/${course.id}`} className="text-blue-500">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}