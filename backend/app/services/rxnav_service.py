import httpx
from typing import List, Dict, Optional
from app.config import get_settings
from app.models.schemas import DrugModel, InteractionResult

settings = get_settings()


class RxNavService:
    """Service for RxNav API interactions"""

    BASE_URL = settings.RXNAV_API_URL

    @staticmethod
    async def get_drug_info(drug_name: str) -> Optional[DrugModel]:
        """
        Get drug information from RxNav API
        
        Args:
            drug_name: Name of the drug to search
            
        Returns:
            DrugModel with drug information or None
        """
        try:
            async with httpx.AsyncClient() as client:
                # Search for drug by name
                response = await client.get(
                    f"{RxNavService.BASE_URL}/drugs?name={drug_name}",
                    timeout=10.0
                )
                response.raise_for_status()
                data = response.json()

                if not data.get("conceptGroup"):
                    return None

                # Extract first matching drug
                drug_group = data["conceptGroup"][0]
                if not drug_group.get("conceptProperties"):
                    return None

                concept = drug_group["conceptProperties"][0]
                
                return DrugModel(
                    rxcui=concept.get("rxcui", ""),
                    name=concept.get("name", drug_name),
                    strength=concept.get("strength", None),
                    form=concept.get("tty", None)
                )

        except Exception as e:
            print(f"Error fetching drug info: {str(e)}")
            return None

    @staticmethod
    async def check_interactions(rxcui1: str, rxcui2: str) -> Optional[InteractionResult]:
        """
        Check interactions between two drugs using their RxCUIs
        
        Args:
            rxcui1: First drug's RxNav Concept ID
            rxcui2: Second drug's RxNav Concept ID
            
        Returns:
            InteractionResult with interaction details or None
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{RxNavService.BASE_URL}/interaction/list.json",
                    params={"rxcuis": f"{rxcui1}+{rxcui2}"},
                    timeout=10.0
                )
                response.raise_for_status()
                data = response.json()

                if not data.get("interactionTypeGroup"):
                    return None

                # Extract first interaction
                interaction_group = data["interactionTypeGroup"][0]
                if not interaction_group.get("interactionType"):
                    return None

                interaction = interaction_group["interactionType"][0]
                interaction_pair = interaction.get("interactionPair", [{}])[0]

                # Determine severity
                severity = "minor"
                description = interaction_pair.get("description", "Interaction detected")
                if "contraindication" in description.lower():
                    severity = "major"
                elif "significant" in description.lower() or "caution" in description.lower():
                    severity = "moderate"

                return InteractionResult(
                    drug1=interaction.get("comment", "Drug 1"),
                    drug2="Drug 2",
                    severity=severity,
                    description=description,
                    affected_systems=[],
                    clinical_significance="See interaction description for details"
                )

        except Exception as e:
            print(f"Error checking interactions: {str(e)}")
            return None

    @staticmethod
    async def get_drug_by_id(rxcui: str) -> Optional[DrugModel]:
        """
        Get detailed drug information by RxCUI
        
        Args:
            rxcui: RxNav Concept ID
            
        Returns:
            DrugModel with detailed info or None
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{RxNavService.BASE_URL}/rxcui/{rxcui}/properties.json",
                    timeout=10.0
                )
                response.raise_for_status()
                data = response.json()

                prop = data.get("properties", {})
                return DrugModel(
                    rxcui=rxcui,
                    name=prop.get("name", ""),
                    strength=prop.get("strength", None),
                    form=prop.get("tty", None)
                )

        except Exception as e:
            print(f"Error fetching drug by ID: {str(e)}")
            return None
