from fastapi import APIRouter, HTTPException, status
from app.models.schemas import DrugModel, InteractionResult
from app.services.rxnav_service import RxNavService

router = APIRouter(prefix="/api/drugs", tags=["drugs"])


@router.get("/search/{drug_name}", response_model=DrugModel)
async def search_drug(drug_name: str):
    """
    Search for a drug by name
    
    Args:
        drug_name: Name of the drug to search
        
    Returns:
        DrugModel with drug information
    """
    drug = await RxNavService.get_drug_info(drug_name)
    if not drug:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Drug '{drug_name}' not found"
        )
    return drug


@router.get("/info/{rxcui}", response_model=DrugModel)
async def get_drug_info(rxcui: str):
    """
    Get detailed drug information by RxCUI
    
    Args:
        rxcui: RxNav Concept ID
        
    Returns:
        DrugModel with detailed drug information
    """
    drug = await RxNavService.get_drug_by_id(rxcui)
    if not drug or not drug.name:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Drug with RxCUI '{rxcui}' not found"
        )
    return drug


@router.post("/check-interaction", response_model=InteractionResult)
async def check_drug_interaction(drug1: str, drug2: str):
    """
    Check for interactions between two drugs
    
    Args:
        drug1: Name or RxCUI of first drug
        drug2: Name or RxCUI of second drug
        
    Returns:
        InteractionResult with interaction details
    """
    # Try to get drug info
    drug1_info = await RxNavService.get_drug_info(drug1)
    drug2_info = await RxNavService.get_drug_info(drug2)

    if not drug1_info or not drug2_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="One or both drugs not found"
        )

    # Check interactions
    interaction = await RxNavService.check_interactions(drug1_info.rxcui, drug2_info.rxcui)
    
    if not interaction:
        # No interaction found - return safe interaction
        return InteractionResult(
            drug1=drug1_info.name,
            drug2=drug2_info.name,
            severity="none",
            description="No known interactions found between these drugs.",
            affected_systems=[],
            clinical_significance="Safe to use together based on current data."
        )

    # Update drug names in result
    interaction.drug1 = drug1_info.name
    interaction.drug2 = drug2_info.name
    
    return interaction
