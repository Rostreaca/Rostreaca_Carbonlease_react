import { useEffect, useState } from 'react';
import { findDetailByNo, toggleLike, getReplies, insertReply, updateReply, deleteReply } from '../../../api/campaign/campaignApi';
import campaignStore from '../../../store/campaignStore';

const useCampaignDetail = (id, onShowToast, auth) => {
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // 댓글 관련 상태
    const [replies, setReplies] = useState([]);
    const [repliesLoading, setRepliesLoading] = useState(false);
    const [repliesError, setRepliesError] = useState(false);

    // 캠페인 ID 변경 시 상세 정보 다시 불러오기
    useEffect(() => {
        if (!id) {
            setError(true);
            setLoading(false);
            return;
        }
        fetchCampaignDetail(id);
    }, [id]);
    

    // 캠페인 상세 정보 불러오기
    const fetchCampaignDetail = (campaignNo) => {
        setLoading(true);
        setError(false);
        findDetailByNo(campaignNo)
            .then((result) => {
                if (result.status === 200) {
                    const campaignData = result.data;
                    const storedLike = campaignStore.getLike(campaignNo);
                    setCampaign({
                        ...campaignData,
                        isLiked: storedLike !== undefined ? storedLike : campaignData.isLiked
                    });
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
                onShowToast(
                    error?.response?.data?.["error-message"] || "캠페인 정보를 불러오지 못했습니다.",
                    "error"
                );
            });
    };

    // 댓글 목록 조회
    const fetchReplies = (pageNo = 1) => {
        setRepliesLoading(true);
        setRepliesError(false);
        getReplies(id, pageNo)
            .then((result) => {
                if (result.status === 200) {
                    setReplies(result.data.replies || []);
                }
            })
            .catch(() => {
                setRepliesError(true);
                onShowToast('댓글을 불러오지 못했습니다.', 'error');
            })
            .finally(() => {
                setRepliesLoading(false);
            });
    };

    // 댓글 등록
    const addReply = (replyContent) => {
        if (!auth || !auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return Promise.reject(new Error('로그인 필요'));
        }
        return insertReply(id, replyContent)
            .then((result) => {
                if (result.status === 200) {
                    fetchReplies();
                    onShowToast('댓글이 등록되었습니다.');
                }
            })
            .catch(() => {
                onShowToast('댓글 등록에 실패했습니다.', 'error');
            });
    };

    // 댓글 수정
    const editReply = (replyNo, replyContent) => {
        if (!auth || !auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return Promise.reject(new Error('로그인 필요'));
        }
        return updateReply(replyNo, replyContent)
            .then((result) => {
                if (result.status === 200) {
                    fetchReplies();
                    onShowToast('댓글이 수정되었습니다.');
                }
            })
            .catch(() => {
                onShowToast('댓글 수정에 실패했습니다.', 'error');
            });
    };

    // 댓글 삭제
    const removeReply = (replyNo) => {
        if (!auth || !auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return Promise.reject(new Error('로그인 필요'));
        }
        return deleteReply(replyNo)
            .then((result) => {
                if (result.status === 200) {
                    fetchReplies();
                    onShowToast('댓글이 삭제되었습니다.');
                }
            })
            .catch(() => {
                onShowToast('댓글 삭제에 실패했습니다.', 'error');
            });
    };

    // 캠페인 좋아요 토글
    const handleLikeToggle = (e, campaignNo, currentLikeStatus) => {
        e.stopPropagation();

        if (!auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return;
        }

        const newLikeStatus = !currentLikeStatus;

        toggleLike(campaignNo)
            .then((result) => {
                if (result.status === 200) {
                    campaignStore.setLike(campaignNo, newLikeStatus);
                    setCampaign(prev =>
                        prev ? { ...prev, isLiked: newLikeStatus } : prev
                    );
                    if (newLikeStatus) {
                        onShowToast('이 캠페인에 공감해주셨어요!');
                    } else {
                        onShowToast('참여를 취소했어요. 언제든 다시 함께해주세요!');
                    }
                }
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '좋아요 처리에 실패했습니다.',
                    'error'
                );
            });
    };

    return {
        campaign,
        loading,
        error,
        fetchCampaignDetail,
        setCampaign,
        handleLikeToggle,
        // 댓글 관련 반환
        replies,
        repliesLoading,
        repliesError,
        fetchReplies,
        addReply,
        editReply,
        removeReply,
        auth,
    };
};

export default useCampaignDetail;
