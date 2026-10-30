import { createContext, useContext, useEffect, useState } from 'react';
import fallback from '../data/courses.json';
import { supabase } from './supabase';

const CoursesContext = createContext({ courses: [], loading: true, source: 'loading' });

// Loads courses once from Supabase. If Supabase is not configured or the
// request fails, it falls back to src/data/courses.json so the site always works.
export function CoursesProvider({ children }) {
  const [state, setState] = useState({ courses: [], loading: true, source: 'loading' });

  useEffect(() => {
    let alive = true;
    (async () => {
      let courses = null;
      if (supabase) {
        const { data, error } = await supabase.from('courses').select('*').order('learners', { ascending: false });
        if (!error && data && data.length > 0) courses = data;
      }
      if (alive) setState({ courses: courses || fallback, loading: false, source: courses ? 'supabase' : 'fallback' });
    })();
    return () => { alive = false; };
  }, []);

  return <CoursesContext.Provider value={state}>{children}</CoursesContext.Provider>;
}

export const useCourses = () => useContext(CoursesContext);
