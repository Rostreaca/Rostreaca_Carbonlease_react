import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Axios 인스턴스 생성
const campaignApi = axios.create({
    baseURL: `${API_BASE_URL}/campaigns`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// 요청 인터셉터 (필요시 토큰 추가)
campaignApi.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰 가져오기 (로그인 구현 시 사용)
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
campaignApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 에러 처리
        if (error.response?.status === 401) {
            // 인증 실패 처리
            console.error('인증이 필요합니다.');
        } else if (error.response?.status === 403) {
            // 권한 없음 처리
            console.error('접근 권한이 없습니다.');
        } else if (error.response?.status === 500) {
            // 서버 에러 처리
            console.error('서버 오류가 발생했습니다.');
        }
        return Promise.reject(error);
    }
);

// 캠페인 리스트 조회
// Spring Boot Controller: GET /api/campaigns?page={page}&size={size}
// 응답 형식: { content: [], totalPages: number, totalElements: number, number: number }
export const getCampaignList = async (page = 1, size = 12) => {
    try {
        // Spring Boot는 페이지를 0부터 시작하므로 -1 처리
        const response = await campaignApi.get('', {
            params: {
                page: page - 1,  // Spring Boot 페이징은 0부터 시작
                size
            }
        });

        // Spring Boot의 Page 응답을 프론트엔드 형식으로 변환
        return {
            campaigns: response.data.content || [],
            currentPage: (response.data.number || 0) + 1,  // 0-based를 1-based로 변환
            totalPages: response.data.totalPages || 0,
            totalElements: response.data.totalElements || 0
        };
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        // 에러 발생 시 더미 데이터 반환 (개발 중)
        return getDummyCampaigns(page, size);
    }
};

// 캠페인 좋아요 토글
// Spring Boot Controller: POST /api/campaigns/{campaignId}/like
// 응답 형식: { success: boolean, liked: boolean }
export const toggleCampaignLike = async (campaignId) => {
    try {
        const response = await campaignApi.post(`/${campaignId}/like`);
        return response.data;
    } catch (error) {
        console.error('Error toggling campaign like:', error);
        // 에러 발생 시 임시 응답
        return { success: true, liked: true };
    }
};

// 캠페인 상세 조회
// Spring Boot Controller: GET /campaigns/{campaignId}
export const getCampaignDetail = async (campaignId) => {
    try {
        const response = await campaignApi.get(`/${campaignId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching campaign detail:', error);
        // 에러 발생 시 더미 데이터 반환
        return getDummyCampaignDetail(campaignId);
    }
};

// 더미 데이터 (개발/테스트용)
const getDummyCampaigns = (page = 1, size = 12) => {
    const totalCampaigns = 50; // 전체 캠페인 수
    const campaigns = [];
    
    const startIdx = (page - 1) * size;
    const endIdx = Math.min(startIdx + size, totalCampaigns);
    
    for (let i = startIdx; i < endIdx; i++) {
        campaigns.push({
            id: i + 1,
            title: `친환경 캠페인 ${i + 1}`,
            description: '일회용품 사용을 줄이고 지구를 지키는 캠페인에 참여해주세요.',
            imageUrl: '/src/assets/images/main/carbon_ca.png',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            participantCount: Math.floor(Math.random() * 1000) + 100,
            isLiked: false,
            category: ['환경보호', '탄소중립', '친환경'][Math.floor(Math.random() * 3)]
        });
    }
    
    return {
        campaigns,
        currentPage: page,
        totalPages: Math.ceil(totalCampaigns / size),
        totalElements: totalCampaigns
    };
};

// 더미 캠페인 상세 데이터
const getDummyCampaignDetail = (campaignId) => {
    const id = parseInt(campaignId);
    return {
        id: id,
        title: `친환경 캠페인 ${id}`,
        description: '일회용품 사용을 줄이고 지구를 지키는 캠페인에 참여해주세요.',
        content: `# 캠페인 소개

이 캠페인은 일회용품 사용을 줄이고 지구 환경을 보호하기 위한 실천 활동입니다.

## 참여 방법
1. 텀블러 사용하기
2. 장바구니 들고 다니기
3. 일회용 빨대 거부하기
4. 재사용 가능한 용기 사용하기

## 기대 효과
- 플라스틱 쓰레기 감소
- CO₂ 배출량 절감
- 지속 가능한 환경 조성

함께 작은 실천으로 큰 변화를 만들어가요!`,
        imageUrl: '/src/assets/images/main/carbon_ca.png',
        detailImageUrl: '/src/assets/images/main/carbon_ca.png', // 상세 이미지
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        participantCount: Math.floor(Math.random() * 1000) + 100,
        isLiked: false,
        category: ['환경보호', '탄소중립', '친환경'][id % 3]
    };
};
