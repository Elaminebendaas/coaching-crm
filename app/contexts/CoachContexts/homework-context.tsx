'use client'
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getCoachHomeworks,
  createCoachHomework,
  deleteCoachHomework,
  updateCoachHomework,
} from "@/util/coach-homework";
import { Homework } from "@prisma/client";

interface HomeworkContextType {
  homeworks: Homework[];
  addHomework: (data: { title: string; description: string }) => Promise<void>;
  editHomework: (homeworkId: string, data: { title: string; description: string }) => Promise<void>;
  removeHomework: (homeworkId: string) => Promise<void>;
  loading: boolean;
  error: string | undefined;
}

const HomeworkContext = createContext<HomeworkContextType | null>(null);

export function HomeworkProvider({
  coachId,
  children,
}: {
  coachId: string;
  children: React.ReactNode;
}) {
  const [homeworks, setHomeworks] = useState<Homework[]>([]); // Default to an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string>(); // Track any errors

  // Fetch homeworks initially
  useEffect(() => {
    async function fetchHomeworks() {
      if (!coachId) {
        setError("Coach ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const fetchedHomeworks = await getCoachHomeworks(coachId);
        if (fetchedHomeworks && Array.isArray(fetchedHomeworks)) {
          setHomeworks(fetchedHomeworks); // Update homeworks if valid
        } else {
          throw new Error("Invalid data received for homeworks.");
        }
      } catch (err) {
        console.error("Error fetching homeworks:", err);
        setError("Failed to fetch homeworks. Please try again.");
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    }

    fetchHomeworks();
  }, [coachId]);

  // Create Homework
  const addHomework = async (data: { title: string; description: string }) => {
    try {
      const newHomework = await createCoachHomework(coachId, data);
      if (newHomework) {
        setHomeworks((prev) => [...prev, newHomework]);
      } else {
        throw new Error("Failed to create homework.");
      }
    } catch (err) {
      console.error("Error adding homework:", err);
      setError("Could not create homework. Please try again.");
    }
  };

  // Update Homework
  const editHomework = async (
    homeworkId: string,
    data: { title: string; description: string }
  ) => {
    try {
      const updatedHomework = await updateCoachHomework(homeworkId, data);
      if (updatedHomework) {
        setHomeworks((prev) =>
          prev.map((hw) => (hw.id === homeworkId ? updatedHomework : hw))
        );
      } else {
        throw new Error("Failed to update homework.");
      }
    } catch (err) {
      console.error("Error editing homework:", err);
      setError("Could not update homework. Please try again.");
    }
  };

  // Delete Homework
  const removeHomework = async (homeworkId: string) => {
    try {
      const deletedHomework = await deleteCoachHomework(homeworkId);
      if (deletedHomework) {
        setHomeworks((prev) => prev.filter((hw) => hw.id !== homeworkId));
      } else {
        throw new Error("Failed to delete homework.");
      }
    } catch (err) {
      console.error("Error deleting homework:", err);
      setError("Could not delete homework. Please try again.");
    }
  };

  return (
    <HomeworkContext.Provider
      value={{
        homeworks,
        addHomework,
        editHomework,
        removeHomework,
        loading,
        error,
      }}
    >
      {children}
    </HomeworkContext.Provider>
  );
}

export function useHomework() {
  const context = useContext(HomeworkContext);
  if (!context) {
    throw new Error("useHomework must be used within a HomeworkProvider");
  }
  return context;
}
