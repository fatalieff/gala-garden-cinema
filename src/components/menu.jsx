import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";

const normalizeCategory = (value) => String(value || "").trim().toLowerCase();

export default function Menu() {
  const [meals, setMeals] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function getMenu() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("meals")
        .select("id,name,price,image_url,category")
        .order("id", { ascending: false });

      if (!alive) return;

      if (error) {
        console.error("Supabase xətası:", error);
        setError(error.message);
        setMeals([]);
        setLoading(false);
        return;
      }

      setMeals(data || []);
      setLoading(false);
    }

    getMenu();

    return () => {
      alive = false;
    };
  }, []);

  const filteredMeals = useMemo(() => {
    if (activeCategory === "all") return meals;
    const normalizedActiveCategory = normalizeCategory(activeCategory);
    return meals.filter(
      (meal) => normalizeCategory(meal.category) === normalizedActiveCategory
    );
  }, [activeCategory, meals]);

  const formatPrice = (priceInCents) => `${(Number(priceInCents || 0) / 100).toFixed(2)} AZN`;

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: "18px", color: "#666" }}>Menyu yüklənir...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "12px",
          padding: "30px 20px",
          maxWidth: "500px",
          margin: "0 auto"
        }}>
          <div style={{ fontSize: "24px", marginBottom: "12px" }}>⚠️</div>
          <h3 style={{ color: "#b91c1c", margin: "0 0 10px 0", fontSize: "18px" }}>
            Menyu yüklənərkən xəta baş verdi
          </h3>
          <p style={{ color: "#7f1d1d", margin: 0, fontSize: "14px" }}>
            Zəhmət olmasa bir az sonra yenidən yoxlayın. Əgər problem davam edirsə, bizimlə əlaqə saxlayın.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-section">
      <div className="category-buttons" style={{ display: "flex", gap: "10px", margin: "20px" }}>
        <button 
          onClick={() => setActiveCategory("all")}
          style={{ padding: "10px", background: activeCategory === "all" ? "orange" : "#ccc" }}
        >
          Hamısı
        </button>
        <button 
          onClick={() => setActiveCategory("fastfood")}
          style={{ padding: "10px", background: activeCategory === "fastfood" ? "orange" : "#ccc" }}
        >
          Fast Food
        </button>
        <button 
          onClick={() => setActiveCategory("doner")}
          style={{ padding: "10px", background: activeCategory === "doner" ? "orange" : "#ccc" }}
        >
          Dönər
        </button>
        <button 
          onClick={() => setActiveCategory("Tantuni&Tost")}
          style={{ padding: "10px", background: activeCategory === "Tantuni&Tost" ? "orange" : "#ccc" }}
        >
          Tantuni &amp; Tost
        </button>
        <button 
          onClick={() => setActiveCategory("Lahmacun&Pide")}
          style={{ padding: "10px", background: activeCategory === "Lahmacun&Pide" ? "orange" : "#ccc" }}
        >
          Lahmacun &amp; Pide
        </button>
      </div>

      <div className="menu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", padding: "20px" }}>
        {filteredMeals.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#666" }}>
            Bu kateqoriyada hələ yemək yoxdur
          </div>
        ) : (
          filteredMeals.map((meal) => (
            <div key={meal.id} className="meal-card" style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
              <img 
                src={meal.image_url} 
                alt={meal.name} 
                style={{ width: "100%", height: "200px", objectFit: "cover" }} 
              />
              <div style={{ padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>{meal.name}</h3>
                <span style={{ fontWeight: "bold", color: "green" }}>
                  {formatPrice(meal.price)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
