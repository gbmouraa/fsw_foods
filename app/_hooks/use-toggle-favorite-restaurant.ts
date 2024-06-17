import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  restaurantIsFavorited?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      toast.success(
        restaurantIsFavorited
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritado.",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => router.push("/my-favorite-restaurants"),
          },
        },
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante.");
    }
  };
  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
